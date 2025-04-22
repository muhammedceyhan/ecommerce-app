export interface AdminUser {
  id?: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}
