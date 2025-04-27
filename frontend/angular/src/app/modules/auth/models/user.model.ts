
export interface AuthUser {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' |'SELLER';
}
