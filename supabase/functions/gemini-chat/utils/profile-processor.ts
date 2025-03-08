
export const processProfile = async (profile: any, authHeader: string | null) => {
  const processResult = await fetch(
    'https://upbnysrcdcpumjyjhysy.supabase.co/functions/v1/process-profile',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader || '',
      },
      body: JSON.stringify({ profileData: profile })
    }
  );

  return processResult.json();
};
