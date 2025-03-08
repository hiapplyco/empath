
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useAIAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeInput = async (inputType: 'resume' | 'audio' | 'video' | 'text', content: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-caregiver', {
        body: { input_type: inputType, content }
      });

      if (error) throw error;
      return data;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze input');
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeInput,
    isAnalyzing,
    error
  };
};
