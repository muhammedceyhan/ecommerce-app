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
  standalone: false,
})
export class UserManagementComponent implements OnInit {
  users: AdminUser[] = [];

  constructor(
    private userService: AdminUserService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }


  deleteUser(id: number): void {
    if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchUsers();
      });
    }
  }


  changeUserRole(userId: number, newRole: string): void {
  if (confirm(`Rolü değiştirmek istediğinize emin misiniz? (${newRole})`)) {
    const roleBody = { role: newRole };

    this.http
      .put(`${environment.apiUrl}/admin/users/${userId}/role`, roleBody, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('Rol başarıyla değiştirildi.');
          this.fetchUsers();
        },
        error: (error) => {
          console.error('Rol değiştirme hatası:', error);
          alert('Rol değiştirilemedi.');
        }
      });
  }
}


  getSimpleRole(fullRole: string): string {
    return fullRole.replace('ROLE_', '');
  }

  getSelectValue(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }

 banUser(userId: number): void {
  this.http
    .put(`${environment.apiUrl}/admin/users/${userId}/ban`, null, { responseType: 'text' })
    .subscribe({
      next: () => {
        const user = this.users.find((u) => u.id === userId);
        if (user) user.banned = true;
        alert('Kullanıcı banlandı.');
      },
      error: () => alert('Banlama işlemi başarısız.')
    });
}

unbanUser(userId: number): void {
  this.http
    .put(`${environment.apiUrl}/admin/users/${userId}/unban`, null, { responseType: 'text' })
    .subscribe({
      next: () => {
        const user = this.users.find((u) => u.id === userId);
        if (user) user.banned = false;
        alert('Ban kaldırıldı.');
      },
      error: () => alert('Ban kaldırma işlemi başarısız.')
    });
}


  goBack() {
    this.router.navigate(['/admin']);
  }
}
