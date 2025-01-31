import './sentry.js';
import { executeApiWithErrorHandling } from './_apiUtils';
import { user_roles, saved_courses } from '../drizzle/schema.js';

export default async function handler(req, res) {
  return executeApiWithErrorHandling(async (req, res, user) => {
    const { role, requiresHigherEducation, courses } = req.body;

    const db = getDBClient();
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
  }, req, res);
}