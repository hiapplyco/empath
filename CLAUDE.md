# em.path - AI Assistant Guide

## Project Overview

em.path is an AI-powered caregiving platform that intelligently connects caregivers (PIAs - Personal In-home Assistants) with care recipients through conversational onboarding, smart matching, and comprehensive management tools.

**Primary Directive**: Assist with development of the em.path platform, focusing on AI integration, user experience, and caregiving workflow optimization.

## Tech Stack Reference

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.1 (dev server on port 8080)
- **Styling**: Tailwind CSS 3.4.11 with custom purple/green theme
- **Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM 6.26.2
- **State Management**: React Query (TanStack Query 5.56.2)
- **Forms**: React Hook Form 7.53.0 with Zod validation
- **Icons**: Lucide React

### Backend
- **Platform**: Supabase
  - PostgreSQL database with Row Level Security
  - JWT-based authentication
  - Edge Functions (Deno runtime)
  - Real-time subscriptions
  - File storage for documents/media
- **AI Integration**: Google Gemini AI for chat and profile processing

## Project Structure

```
empath/
├── src/
│   ├── components/        # UI components organized by feature
│   │   ├── admin/        # Admin dashboard (PIA management, monitoring)
│   │   ├── auth/         # Login, registration, verification
│   │   ├── care-recipient/ # Care recipient-specific features
│   │   ├── care-seeker/  # Care seeker features
│   │   ├── chat/         # Emma AI chat interface
│   │   ├── dashboard/    # Dashboard layouts and navigation
│   │   ├── landing/      # Landing page components
│   │   ├── onboarding/   # Multi-modal onboarding flows
│   │   ├── profile/      # Profile display and editing
│   │   └── ui/          # Base shadcn/ui components
│   ├── pages/           # Route-level page components
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Supabase client and external services
│   ├── lib/             # Utilities, helpers, constants
│   └── types/           # TypeScript type definitions
├── supabase/
│   ├── functions/       # Edge functions for AI and processing
│   └── migrations/      # Database schema migrations
└── public/              # Static assets and images
```

## Key Components & Features

### User Types
1. **Care Recipients/Seekers**: Those needing care services
2. **PIAs (Caregivers)**: Personal In-home Assistants providing care
3. **Administrators**: Platform managers with oversight capabilities

### Core Features
1. **AI-Powered Onboarding**
   - Emma AI assistant for conversational profile creation
   - Multiple input modes: chat, audio, video, manual forms
   - Resume/document processing for caregivers
   - Automatic profile generation from conversations

2. **Matching System**
   - Intelligent caregiver-recipient matching
   - Location-based searching
   - Skill and need alignment
   - Urgent request handling

3. **Admin Dashboard**
   - PIA activity monitoring
   - Manual match creation
   - Verification management
   - Analytics and reporting

### Important Files
- `src/components/chat/ChatInterface.tsx` - Main AI chat component
- `src/components/onboarding/` - Various onboarding flow components
- `src/pages/AdminDashboard.tsx` - Admin control center
- `supabase/functions/` - AI processing and backend logic
- `src/integrations/supabase/` - Database client and types

## Development Workflow

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev              # Runs on http://localhost:8080

# Code quality
npm run lint             # Run ESLint

# Production build
npm run build            # Create production build
npm run preview          # Preview production build
```

### Environment Setup
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Common Tasks

#### Adding a New Feature
```bash
# 1. Create component structure
mkdir -p src/components/feature-name
touch src/components/feature-name/FeatureComponent.tsx

# 2. Follow existing patterns
# - Use TypeScript interfaces for props
# - Leverage shadcn/ui components
# - Use React Query for data fetching
# - Apply Tailwind classes for styling

# 3. Update routing if needed
# Edit src/App.tsx to add new routes

# 4. Verify code quality
npm run lint
```

#### Working with Supabase
```typescript
// Import the client
import { supabase } from "@/integrations/supabase/client";

// Example query
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_type', 'pia');

// Real-time subscription
const channel = supabase
  .channel('custom-channel')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'profiles' 
  }, handleChange)
  .subscribe();
```

#### UI Component Usage
```tsx
// Use shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Apply consistent styling
<Button variant="default" className="bg-primary hover:bg-primary/90">
  Action
</Button>
```

## Code Style Guidelines

### TypeScript
- Always define interfaces for component props
- Use type imports: `import type { User } from "@/types"`
- Prefer const assertions and as const where applicable
- Name interfaces with "I" prefix sparingly, only when avoiding conflicts

### React Patterns
```tsx
// Component structure
interface Props {
  // Define all props with JSDoc when helpful
}

export function ComponentName({ prop1, prop2 }: Props) {
  // Hooks at the top
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="space-y-4">
      {/* Component JSX */}
    </div>
  );
}
```

### Styling
- Use Tailwind utility classes
- Follow the custom color scheme (primary purple, secondary green)
- Maintain consistent spacing with Tailwind's spacing scale
- Use shadcn/ui component variants for consistency

## AI Integration Points

### Chat with Emma
- Component: `src/components/chat/ChatInterface.tsx`
- Edge Function: `supabase/functions/chat-with-emma`
- Handles conversational onboarding and support

### Profile Processing
- Edge Functions handle resume parsing and profile generation
- AI extracts relevant information from documents and conversations
- Results stored in structured database format

### Matching Algorithm
- Consider skills, location, availability, and preferences
- AI assists in ranking and suggesting matches
- Admin can override AI recommendations

## Security Considerations

1. **Authentication**: All routes protected by Supabase Auth
2. **RLS Policies**: Database access controlled at row level
3. **File Uploads**: Validated and stored securely in Supabase Storage
4. **API Keys**: Never expose Supabase service role key client-side
5. **Input Validation**: Use Zod schemas for all user inputs

## Testing Strategy

**Note**: Currently no test suite implemented. When adding tests:
1. Use Vitest for unit testing
2. React Testing Library for component tests
3. Playwright for E2E testing
4. Focus on critical user flows and AI interactions

## Common Patterns

### Data Fetching
```tsx
// Use React Query hooks
const { data, isLoading, error } = useQuery({
  queryKey: ['profiles', userId],
  queryFn: () => fetchProfile(userId),
});
```

### Form Handling
```tsx
// Use React Hook Form with Zod
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    // Set defaults
  },
});
```

### Toast Notifications
```tsx
import { toast } from "sonner";

toast.success("Profile updated successfully");
toast.error("Failed to save changes");
```

## Debugging Tips

1. **Check Network Tab**: For Supabase API calls
2. **Console Errors**: Look for RLS policy violations
3. **React Query DevTools**: Monitor query states
4. **Supabase Dashboard**: Verify data and logs
5. **Edge Function Logs**: Check Supabase dashboard for function errors

## Performance Optimization

1. **Lazy Load Routes**: Use React.lazy for code splitting
2. **Optimize Images**: Use appropriate formats and sizes
3. **Memoize Expensive Operations**: Use useMemo and useCallback
4. **Virtual Scrolling**: For long lists (consider @tanstack/react-virtual)
5. **Bundle Analysis**: Use vite-plugin-visualizer if needed

---

**Remember**:
- Always consider the caregiving context in UX decisions
- Prioritize accessibility for diverse user groups
- Test AI interactions thoroughly
- Keep security and privacy paramount
- Follow existing patterns for consistency

**Project Version**: 1.0.0
**Last Updated**: 2025-01-29