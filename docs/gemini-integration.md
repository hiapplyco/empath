# Integrating Gemini 2.0 Flash Live API with React & Supabase

## Overview

This guide covers how to integrate Google's Gemini 2.0 Flash Live API into a React application with Supabase for backend functionality. Gemini 2.0 Flash is designed for real-time multimodal interactions and provides fast, efficient AI capabilities that can enhance your application.

## Prerequisites

- React application setup
- Supabase project configured
- Google AI Studio account with API access
- Node.js and npm installed

## Step 1: Set Up Your React Project

If you haven't already, create a new React project:

```bash
npx create-react-app gemini-supabase-app
cd gemini-supabase-app
```

## Step 2: Install Required Dependencies

```bash
npm install @google/generative-ai @supabase/supabase-js react-markdown
```

## Step 3: Get API Keys

1. Obtain a Gemini API key from Google AI Studio (https://makersuite.google.com/app/apikey)
2. Get your Supabase URL and anon key from your Supabase project dashboard

## Step 4: Set Up Environment Variables

Create a `.env` file in your project root and add your API keys:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

Make sure to add this file to `.gitignore` to keep your keys secure.

## Step 5: Set Up Supabase Client

Create a utility file for Supabase configuration:

```javascript
// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Step 6: Configure Gemini API Client

Create a utility file for the Gemini API:

```javascript
// src/utils/geminiClient.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the model - note the "flash-exp" suffix for experimental access
export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-exp"
});

// Function for basic text generation
export const generateContent = async (prompt) => {
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
};

// Function for real-time streaming
export const streamContent = async (prompt, onUpdate) => {
  const result = await geminiModel.generateContentStream(prompt);
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    onUpdate(chunkText);
  }
};

// Helper function for chat-based interactions
export const startChat = () => {
  return geminiModel.startChat({
    generationConfig: {
      maxOutputTokens: 8192,
    },
  });
};
```

## Step 7: Create a Chat Storage Service with Supabase

```javascript
// src/services/chatService.js
import { supabase } from '../utils/supabaseClient';

// Save chat history to Supabase
export async function saveChatHistory(userId, conversationId, messages) {
  const { data, error } = await supabase
    .from('chat_history')
    .upsert({
      user_id: userId,
      conversation_id: conversationId,
      messages: messages,
      updated_at: new Date()
    }, { onConflict: 'conversation_id' });

  if (error) {
    console.error('Error saving chat history:', error);
    throw error;
  }
  
  return data;
}

// Retrieve chat history from Supabase
export async function getChatHistory(userId, conversationId) {
  const { data, error } = await supabase
    .from('chat_history')
    .select('messages')
    .eq('user_id', userId)
    .eq('conversation_id', conversationId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
    console.error('Error retrieving chat history:', error);
    throw error;
  }
  
  return data ? data.messages : [];
}

// Create a new conversation
export async function createConversation(userId, title) {
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      user_id: userId,
      title: title,
      created_at: new Date()
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
  
  return data;
}

// List all conversations for a user
export async function listConversations(userId) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error listing conversations:', error);
    throw error;
  }
  
  return data || [];
}
```

## Step 8: Create Supabase Database Tables

Run these SQL commands in your Supabase SQL editor to create the necessary tables:

```sql
-- Create a table for conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- Create a table for chat history
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  conversation_id UUID NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE,
    
  CONSTRAINT fk_conversation
    FOREIGN KEY(conversation_id)
    REFERENCES conversations(id)
    ON DELETE CASCADE
);

-- Create indexes for faster queries
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX idx_chat_history_conversation_id ON chat_history(conversation_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
```

## Step 9: Create a Chat Component

```jsx
// src/components/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { streamContent } from '../utils/geminiClient';
import { saveChatHistory, getChatHistory } from '../services/chatService';

function Chat({ userId, conversationId }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history when the component mounts
  useEffect(() => {
    async function loadChatHistory() {
      try {
        const history = await getChatHistory(userId, conversationId);
        setMessages(history);
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
    
    if (userId && conversationId) {
      loadChatHistory();
    }
  }, [userId, conversationId]);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isStreaming) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(msgs => [...msgs, userMessage]);
    setInput('');
    setIsStreaming(true);
    
    // Create placeholder for AI response
    const aiMessageIndex = messages.length;
    setMessages(msgs => [...msgs, { role: 'assistant', content: '' }]);
    
    try {
      // Stream the response
      let responseContent = '';
      await streamContent(input, (chunk) => {
        responseContent += chunk;
        setMessages(msgs => {
          const newMsgs = [...msgs];
          newMsgs[aiMessageIndex] = { role: 'assistant', content: responseContent };
          return newMsgs;
        });
      });
      
      // Save the final chat history to Supabase
      const updatedMessages = [
        ...messages, 
        userMessage, 
        { role: 'assistant', content: responseContent }
      ];
      await saveChatHistory(userId, conversationId, updatedMessages);
      
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      // Update the assistant message with an error
      setMessages(msgs => {
        const newMsgs = [...msgs];
        newMsgs[aiMessageIndex] = { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error processing your request.' 
        };
        return newMsgs;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-content">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isStreaming}
        />
        <button type="submit" disabled={isStreaming || !input.trim()}>
          {isStreaming ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Chat;
```

## Best Practices for Gemini 2.0 Flash API Integration

1. **Use Streaming for Real-time Responses**: Implement streaming responses for a more interactive user experience.

2. **Handle Rate Limits**: Implement proper rate limiting and error handling to manage API usage effectively.

3. **Optimize Token Usage**: Be mindful of token limits in your prompts and responses to optimize costs.

4. **Implement Security**: Never expose your API keys in client-side code. Consider using a backend proxy to handle Gemini API calls.

5. **Add User Authentication**: Require users to authenticate before accessing the AI features.

6. **Cache Common Responses**: Store frequently requested information to reduce API calls.

7. **Add Conversation Management**: Allow users to save, retrieve, and manage their conversation history.

8. **Implement Proper Error Handling**: Gracefully handle API errors with user-friendly messages.

9. **Use Server-Side Functions**: Consider moving API interactions to server-side functions or Edge Functions in Supabase for better security.

10. **Implement Content Moderation**: Add safeguards to prevent generation of harmful or inappropriate content.

11. **Optimize for Mobile**: Ensure your UI works well on mobile devices with responsive design.

12. **Add Loading States**: Provide clear loading indicators during API calls for better user experience.

## Conclusion

This guide provides a comprehensive setup for integrating Gemini 2.0 Flash Live API with a React and Supabase application. The implementation allows for real-time streaming responses, user authentication, and conversation management with persistent storage in Supabase.

By following these steps, you can create a powerful AI chat application that leverages Google's latest generative AI capabilities while maintaining full control over user data and authentication through Supabase.