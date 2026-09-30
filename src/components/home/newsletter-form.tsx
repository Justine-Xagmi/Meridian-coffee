'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { subscribeAction, type NewsletterState } from '@/lib/actions/newsletter-actions';

const initialState: NewsletterState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-60"
    >
      {pending ? 'Subscribing…' : 'Subscribe'}
    </button>
  );
}

export function NewsletterForm() {
  const [state, formAction] = useFormState(subscribeAction, initialState);

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-3 sm:flex-row" noValidate>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="focus-ring h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-ink placeholder:text-muted sm:max-w-xs"
          aria-describedby="newsletter-status"
        />
        <SubmitButton />
      </form>
      <p id="newsletter-status" role="status" aria-live="polite" className="mt-2 text-sm text-muted">
        {state.status === 'success' && <span className="text-success">{state.message}</span>}
        {state.status === 'error' && <span className="text-danger">{state.message}</span>}
      </p>
    </div>
  );
}
