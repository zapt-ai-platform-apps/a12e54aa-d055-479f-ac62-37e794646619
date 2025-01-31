import * as Sentry from '@sentry/browser';

export async function handleSubmitAnswers({
  answers,
  setLoading,
  setRecommendations,
  supabase
}) {
  try {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/work-environment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`
      },
      body: JSON.stringify(answers)
    });

    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    setRecommendations(data.recommendations);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Submission error:', error);
  } finally {
    setLoading(false);
  }
}