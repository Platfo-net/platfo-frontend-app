export type AuthState = {
  access_token: string;
  token_type: string;
  isLoggedIn: boolean;
};

export interface ILoginApiResponse {
  access_token: string;
  token_type: string;
}
