import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../services/admin-user.service';
import { AdminUser } from '../../models/admin-user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  standalone: false
})
export class UserManagementComponent implements OnInit {
  users: AdminUser[] = [];

  constructor(private userService: AdminUserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Tüm kullanıcıları getir
  fetchUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // Kullanıcıyı sil
  deleteUser(id: number): void {
    if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchUsers(); // Silindikten sonra liste güncellenir
      });
    }
  }
}
