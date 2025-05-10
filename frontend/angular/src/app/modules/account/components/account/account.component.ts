import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: false,
})
export class AccountComponent implements OnInit {

  editingAddress = false;
newAddress = '';
currentPassword = '';
newPassword = '';
confirmPassword = '';

user :any

  constructor(private authService: AuthService) {}


 
  
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.wait1sc()
  }

  async wait1sc(){
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(this.user)

  }

  addAddress() {
    alert('Adres ekleme ekranı henüz aktif değil.');
  }

//   saveAddress() {
//   if (!this.newAddress.trim()) return alert('Adres boş olamaz.');

//   // Backend'e gönderilecek DTO
//   const updated = { ...this.user, address: this.newAddress };
//   this.authService.updateUser(updated).subscribe({
//     next: () => {
//       this.user.address = this.newAddress;
//       this.editingAddress = false;
//       alert('Adres güncellendi.');
//     },
//     error: (err) => {
//       console.error(err);
//       alert('Adres güncellenemedi.');
//     }
//   });
// }

changePassword() {
  if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
    return alert('Lütfen tüm alanları doldurun.');
  }

  if (this.newPassword !== this.confirmPassword) {
    return alert('Yeni şifreler eşleşmiyor.');
  }

  const userId = this.authService.getUserId();

  if (userId === null) {
    return alert('Kullanıcı ID bulunamadı.');
  }

  this.authService.changePassword(userId, this.currentPassword, this.newPassword).subscribe({
    next: () => {
      alert('Şifre başarıyla güncellendi.');
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    },
    error: () => alert('Şifre güncellenemedi. Eski şifre yanlış olabilir.')
  });
}



saveAddress() {
  if (!this.newAddress.trim()) return alert('Adres boş olamaz.');
  const userId = this.authService.getUserId();

  const updated = {
    ...this.user,
    address: this.newAddress
  };

  this.authService.updateUser(updated).subscribe({
    next: () => {
      this.user.address = this.newAddress;
      this.editingAddress = false;
      alert('Adres güncellendi.');
    },
    error: () => alert('Adres güncellenemedi.')
  });
}

}
