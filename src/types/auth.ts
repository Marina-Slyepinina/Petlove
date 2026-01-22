export interface registerPayload {
  name: string;
  email: string;
  password: string;
}

export interface loginPayload {
  email: string;
  password: string;
}

export interface authResponse {
  email: string;
  name: string;
  token: string;
}