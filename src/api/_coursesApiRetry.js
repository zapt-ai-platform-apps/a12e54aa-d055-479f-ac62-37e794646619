import { fetchCoursesFromPerplexity } from './_coursesApiService';

export async function fetchWithRetry(prompt, retries = 3) {
  try {
    return await fetchCoursesFromPerplexity(prompt);
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));
      return fetchWithRetry(prompt, retries - 1);
    }
    throw error;
  }
}