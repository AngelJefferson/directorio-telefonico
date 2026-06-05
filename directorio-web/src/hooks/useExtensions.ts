import { useState, useEffect, useCallback, useRef } from 'react';
import type { Extension, ExtensionFilters } from '../types';
import { fetchExtensions } from '../services/api';

interface UseExtensionsReturn {
  extensions: Extension[];
  loading: boolean;
  error: string | null;
  filters: ExtensionFilters;
  setFilters: React.Dispatch<React.SetStateAction<ExtensionFilters>>;
  retry: () => void;
}

const DEBOUNCE_MS = 300;

export function useExtensions(): UseExtensionsReturn {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ExtensionFilters>({
    buscar: '',
    departamento: '',
    sede: '',
  });

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(
    (signal: AbortSignal) => {
      setLoading(true);
      setError(null);

      fetchExtensions(filters, signal)
        .then((data) => {
          if (!signal.aborted) setExtensions(data);
        })
        .catch((err) => {
          if (!signal.aborted && err instanceof Error && err.name !== 'AbortError') {
            setError(err.message);
          }
        })
        .finally(() => {
          if (!signal.aborted) setLoading(false);
        });
    },
    [filters],
  );

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      load(controller.signal);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      controller.abort();
    };
  }, [load]);

  const retry = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    load(controller.signal);
  }, [load]);

  return { extensions, loading, error, filters, setFilters, retry };
}
