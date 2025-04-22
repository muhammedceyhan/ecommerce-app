import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  standalone:false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Reactive form oluşturuluyor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Form submit edildiğinde çalışır
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      // this.authService.login(credentials).subscribe({
      //   next: () => {
      //     const role = localStorage.getItem('role');
      //     if (role === 'ADMIN') {
      //       this.router.navigate(['/admin']);
      //     } else {
      //       this.router.navigate(['/']);
      //     }
      //   },
      //   error: () => alert("Giriş başarısız!")
      // });


      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          const role = this.authService.getRole();

          // Eğer adminse admin dashboard'a yönlendir
          if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            // Kullanıcıysa anasayfaya ya da başka yere
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          error: () => alert("Giriş başarısız!")
        }
      });
    }
  }
}
