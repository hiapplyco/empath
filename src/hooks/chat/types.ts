
export type ChatState = 'idle' | 'initializing' | 'sending' | 'generating-profile';

export interface Message {
  role: 'assistant' | 'user';
  content: string;
  isProfileData?: boolean;
}

export interface UserContext {
  name?: string;
  email?: string;
  onboardingStep: 'profile_creation';
}

export interface ProfileData {
  raw_profile: CaregiverProfile;
  processed_profile: ProcessedProfile;
}

export interface CaregiverProfile {
  sections: ProfileSection[];
  matching_tags: string[];
  profile_completeness_score: number;
  verification_needed: string[];
}

export interface ProcessedProfile {
  sections: ProfileSection[];
}

export interface ProfileSection {
  title: string;
  variant: 'default' | 'grid' | 'list' | 'badges';
  items: ProfileItem[];
}

export interface ProfileItem {
  label: string;
  value: string | number;
  confidence?: number;
}
