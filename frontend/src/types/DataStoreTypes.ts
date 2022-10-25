export class ErrorWithStatus extends Error {
  status?: number;
}

type Action<T> = {
  type: "loading" | "data" | "error" | "initial";
  payload?: {
    data?: T[];
    error?: ErrorWithStatus;
    delete?: (ids: number[]) => Promise<void>;
    create?: (object: Omit<T, "id">) => Promise<void>;
  };
};

type Cache<T> = { [key: string]: T[] };

type State<T> = {
  loading: boolean;
  data?: T[];
  errors?: ErrorWithStatus[];
  delete?: (ids: number[]) => Promise<void>;
  create?: (object: Omit<T, "id">) => Promise<void>;
};

export type { Action, Cache, State };
