import { useEffect, useState } from "react";

export const useDebounce = (
  value: string | undefined,
  delay: number
): string | undefined => {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(
    value
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value && value?.length >= 3 || value === "") setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
