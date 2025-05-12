export interface AdminUser {
  id?: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  banned: boolean;

}
