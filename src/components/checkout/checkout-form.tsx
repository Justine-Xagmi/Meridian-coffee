'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { placeOrderAction, type CheckoutState } from '@/lib/actions/checkout-actions';

const initialState: CheckoutState = { status: 'idle' };

function Field({
  id,
  label,
  type = 'text',
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="focus-ring mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-3.5 text-sm text-ink"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring inline-flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-60"
    >
      {pending ? 'Placing order…' : 'Place order'}
    </button>
  );
}

export function CheckoutForm() {
  const [state, formAction] = useFormState(placeOrderAction, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <Field id="name" label="Full name" autoComplete="name" error={state.fieldErrors?.name} />
      <Field id="email" label="Email" type="email" autoComplete="email" error={state.fieldErrors?.email} />
      <Field id="address" label="Street address" autoComplete="street-address" error={state.fieldErrors?.address} />
      <div className="grid grid-cols-2 gap-4">
        <Field id="city" label="City" autoComplete="address-level2" error={state.fieldErrors?.city} />
        <Field id="postalCode" label="Postal code" autoComplete="postal-code" error={state.fieldErrors?.postalCode} />
      </div>
      <div>
        <label htmlFor="country" className="text-sm font-medium text-ink">
          Country
        </label>
        <select
          id="country"
          name="country"
          required
          defaultValue="United States"
          className="focus-ring mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-3.5 text-sm text-ink"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
          <option>Australia</option>
          <option>Germany</option>
        </select>
      </div>

      <p className="rounded-lg bg-surface-2 px-3.5 py-2.5 text-xs text-muted">
        This is a portfolio demo — no real payment is collected. Placing an order simulates checkout end to end.
      </p>

      {state.status === 'error' && !state.fieldErrors && (
        <p role="alert" className="text-sm text-danger">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
