export interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | null;
  user: User | null;
  loading: boolean;
  redirectConfirmed: boolean;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  get_full_name: string;
  get_short_name: string;
}
export enum AlertType {
  Success = "success",
  Error = "failure",
  Warning = "warning",
  Info = "info",
  Gray = "gray",
}
export interface AlertState {
  msg: string | null;
  type: AlertType | null;
}

// interface contact

export interface ContactState {
  loading: boolean;
}

// interface campaign
export interface CampaignState {
  list: ListClientResponse;
  list_items: ListItemsClientResponse;
}

export interface ListClientResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListClient[] | null;
}

export interface ListItemsClientResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListItemClient[] | null;
}

export interface ListClient {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  slug: string;
}

export interface ListItemClient {
  id: number;
  client: Client;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  slug: string;
  fullname: string;
}
