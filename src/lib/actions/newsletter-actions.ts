'use server';

import { z } from 'zod';

const schema = z.object({ email: z.string().email() });

export type NewsletterState = { status: 'idle' | 'success' | 'error'; message?: string };

export async function subscribeAction(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const parsed = schema.safeParse({ email: formData.get('email') });
  if (!parsed.success) {
    return { status: 'error', message: 'Enter a valid email address.' };
  }
  // Demo only — in production, forward to your email provider (Resend, Klaviyo, etc).
  await new Promise((r) => setTimeout(r, 300));
  return { status: 'success', message: `You're on the list — check ${parsed.data.email} for a welcome note.` };
}
