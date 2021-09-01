export interface JwtPayload {
  id: number;
  email: string;
  password?: string;
  fullName?: string;
  iat?: number;
  exp?: number;
}
