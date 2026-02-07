// lib/db-wrapper.ts

type Success<T> = { data: T; error: null };
type Failure = { data: null; error: string };
type Result<T> = Success<T> | Failure;

export async function asyncWrapper<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error: any) {
    console.error('Database Error:', error);
    return {
      data: null,
      error: error.message || 'An unexpected database error occurred.'
    };
  }
}
