import { initializeZapt } from '@zapt/zapt-js';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as Sentry from '@sentry/node';

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error('Invalid token');
  }

  return user;
}

export function getDBClient() {
  const client = postgres(process.env.COCKROACH_DB_URL);
  return drizzle(client);
}

export async function executeApiWithErrorHandling(apiFunction, req, res) {
  try {
    const user = await authenticateUser(req);
    return await apiFunction(req, res, user);
  } catch (error) {
    console.error('API error:', error.message);
    Sentry.captureException(error);
    res.status(500).json({ 
      error: error.message || 'Failed to process request'
    });
  }
}