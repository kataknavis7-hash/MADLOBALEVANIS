import { useCallback, useEffect, useState } from 'react';
import type { Course } from '../types/course';

interface UseFetchCoursesResult {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom Hook: კურსების ჩამოტვირთვა fetch-ით.
 * - აუქმებს მოთხოვნას კომპონენტის გაუქმებისას (AbortController)
 * - ამოწმებს HTTP სტატუსს და პასუხის ფორმატს
 */
export function useFetchCourses(url: string): UseFetchCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`სერვერმა დააბრუნა შეცდომა (${res.status})`);
        const data: unknown = await res.json();
        if (!Array.isArray(data)) throw new Error('მონაცემების ფორმატი არასწორია');
        setCourses(data as Course[]);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'უცნობი შეცდომა');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [url, reloadKey]);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  return { courses, loading, error, refetch };
}
