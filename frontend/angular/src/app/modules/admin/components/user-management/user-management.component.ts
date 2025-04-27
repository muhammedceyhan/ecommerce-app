import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../services/admin-user.service';
import { AdminUser } from '../../models/admin-user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  standalone: false
})
export class UserManagementComponent implements OnInit {
  users: AdminUser[] = [];

  constructor(
    private userService: AdminUserService,
    private router: Router,
    private http: HttpClient // Rol güncellemek için küçük bir patch işlemi için
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Kullanıcıları getir
  fetchUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // Kullanıcıyı sil
  deleteUser(id: number): void {
    if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  // 🔥 Kullanıcı rolünü değiştir
  changeUserRole(userId: number, newRole: string): void {
    if (confirm(`Rolü değiştirmek istediğinize emin misiniz? (${newRole})`)) {
      this.http.put(`${environment.apiUrl}/admin/users/${userId}/role`, newRole, {
        headers: { 'Content-Type': 'text/plain' }
      }).subscribe({
        next: () => {
          alert('Rol başarıyla değiştirildi.');
          this.fetchUsers(); // Listeyi güncelle
        },
        error: (error) => {
          console.error('Rol değiştirme hatası:', error);
          alert('Rol değiştirilemedi.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin']);
  }

  getSelectValue(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }

}
