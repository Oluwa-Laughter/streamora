// Per-browser convenience only: the chain is the source of truth for streams.
const read = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};

export const getStreamIds = (addr: string): string[] => read(`streamora:streams:${addr}`, []);
export const addStreamId = (addr: string, id: string) => {
  const ids = getStreamIds(addr);
  if (!ids.includes(id)) write(`streamora:streams:${addr}`, [...ids, id]);
};

export interface ActivityItem {
  hash: string;
  kind: "create" | "withdraw" | "cancel";
  streamId: string;
  amount?: string;
  at: number;
  status: "SUCCESS" | "FAILED";
}
export const getActivity = (addr: string): ActivityItem[] => read(`streamora:activity:${addr}`, []);
export const addActivity = (addr: string, item: ActivityItem) =>
  write(`streamora:activity:${addr}`, [item, ...getActivity(addr)].slice(0, 100));
