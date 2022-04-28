export const ROUTE = Object.freeze({
  HOME: 'Home',
  EXAMPLE: 'Example',
  NOT_FOUND: 'NotFound',
} as const);

export type Routes = typeof ROUTE[keyof typeof ROUTE];
