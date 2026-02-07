'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      <button disabled={pending}>{pending ? '...' : text}</button>
    </>
  );
}
