import { useCallback, useEffect, useState } from "react";

interface AsyncResult<T> {
  attempt: number;
  data: T | null;
  error: string | null;
}

export function useAsyncData<T>(loader: () => Promise<T>) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<AsyncResult<T>>({
    attempt: -1,
    data: null,
    error: null,
  });

  const loading = result.attempt !== attempt;

  useEffect(() => {
    let cancelled = false;
    loader()
      .then((data) => {
        if (!cancelled) setResult({ attempt, data, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setResult({
            attempt,
            data: null,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [attempt, loader]);

  const reload = useCallback(() => setAttempt((a) => a + 1), []);

  return { data: result.data, loading, error: result.error, reload };
}
