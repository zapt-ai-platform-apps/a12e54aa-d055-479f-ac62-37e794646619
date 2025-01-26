import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from './_apiUtils.js';
import { user_roles, saved_courses } from '../drizzle/schema.js';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { role, requiresHigherEducation, courses } = req.body;

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
        course_title: course.name,
        course_url: course.link,
        is_higher_education: requiresHigherEducation
      }))
    );

    res.status(200).json({ success: true });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}