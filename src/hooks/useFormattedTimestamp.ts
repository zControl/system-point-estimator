import { useMemo } from "react";

export const useFormattedTimestamp = (timestamp: string) => {
  return useMemo(() => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }, [timestamp]);
}