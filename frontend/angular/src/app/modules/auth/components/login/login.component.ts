import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent, of, timer } from 'rxjs';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  standalone:false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email: string = '';
  password: string = '';

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
      this.authService.login(credentials).subscribe({
        next: (res) => {
          const role = res.role; // doğrudan response içinden al
          if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/products']);
          }
        }

        ,
        error: () => alert("Giriş başarısız!")
      });
    }
  }

  goToHome() {
    this.router.navigate(['/products']);
  }
}
