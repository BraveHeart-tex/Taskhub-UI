export type HttpError =
  | {
      type: 'NetworkError';
      message: string;
    }
  | {
      type: 'HttpError';
      status: number;
      body: unknown;
    }
  | {
      type: 'DecodeError';
      message: string;
      body: unknown;
    };
