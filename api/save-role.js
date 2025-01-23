import './sentry';
import * as Sentry from '@sentry/node';
import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { user_roles, saved_courses } from '../drizzle/schema.js';

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { role, requiresHigherEducation, courses } = req.body;
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const [newRole] = await db.insert(user_roles).values({
      user_id: user.id,
      role_title: role,
      requires_higher_education: requiresHigherEducation
    }).returning();

    await db.insert(saved_courses).values(
      courses.map(course => ({
        user_id: user.id,
        role_id: newRole.id,
        provider_name: course.provider,
        course_title: course.course,
        course_url: course.url,
        is_higher_education: requiresHigherEducation
      }))
    );

    res.status(200).json({ success: true });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}