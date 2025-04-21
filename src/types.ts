export interface ErrorResponse extends Error {
  status: number;
}

export interface Payload {
  id: string;
}
