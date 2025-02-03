import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from '../_apiUtils.js';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { challenge_responses, user_specializations } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const client = postgres(process.env.COCKROACH_DB_URL);
const db = drizzle(client);

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { challenge_id, response, role_id } = req.body;

    // Get challenge details
    const [challenge] = await db.select()
      .from(niche_challenges)
      .where(eq(niche_challenges.id, challenge_id));

    // Simple keyword matching feedback
    const matches = challenge.expected_answer_keywords.filter(keyword => 
      response.toLowerCase().includes(keyword.toLowerCase())
    );
    
    const feedback = matches.length > 0 
      ? `Great job using relevant terms like ${matches.join(', ')}! Consider expanding on ${challenge.expected_answer_keywords.find(k => !matches.includes(k))}.`
      : `Try focusing on aspects like ${challenge.expected_answer_keywords.join(', ')} in your response.`;

    // Save response
    await db.insert(challenge_responses).values({
      user_id: user.id,
      challenge_id,
      response,
      feedback
    });

    // Generate specializations after 3 challenges
    const responsesCount = await db.select()
      .from(challenge_responses)
      .where(eq(challenge_responses.user_id, user.id));

    let specializations = [];
    if (responsesCount.length >= 3) {
      specializations = [
        'Technical Specialist',
        'Client-Facing Expert',
        'Operational Leader'
      ];
    }

    res.status(200).json({ 
      feedback,
      specializations
    });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}