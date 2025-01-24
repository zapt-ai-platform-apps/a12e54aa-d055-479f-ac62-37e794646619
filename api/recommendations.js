import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from './_apiUtils.js';
import { ROLE_MATRIX } from './config/roleMatrix.js';
import { getRoleDescription, getRoleTags } from './utils/roleHelpers.js';

export default async function handler(req, res) {
  try {
    await authenticateUser(req);
    const answers = req.body;
    
    const recommendations = Object.entries(answers).reduce((acc, [key, values]) => {
      values.forEach(value => {
        const roles = ROLE_MATRIX[key]?.[value] || [];
        roles.forEach(role => {
          acc[role] = (acc[role] || 0) + 1;
        });
      });
      return acc;
    }, {});

    const sortedRoles = Object.entries(recommendations)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([title]) => ({
        title,
        description: getRoleDescription(title),
        tags: getRoleTags(title)
      }));

    res.status(200).json({ recommendations: sortedRoles });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}