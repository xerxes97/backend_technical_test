export interface JwtPayload {
  email: string;
  id: string;
  iat: number;
  exp: number;
}

export type IGenerateTokens = Pick<JwtPayload, 'email' | 'id'>;
