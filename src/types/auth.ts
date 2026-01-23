export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  name: string;
  token: string;
}

export interface AuthState {
  user: { name: string; email: string } | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;

  register: (credentials: RegisterPayload) => void;
  login: (credentials: LoginPayload) => void;
  logout: () => void;
  refreshUser: () => void;
}
