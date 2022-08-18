export interface IFormSignUp {
  email: string;
  password: string;
  re_password: string;
  acept_terms: boolean;
}

export interface IformResetPassword {
  new_password: string;
  re_new_password: string;
}
