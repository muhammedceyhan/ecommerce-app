import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent, of, tap, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // Reactive form oluşturuluyor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Form submit edildiğinde çalışır
  // src/app/modules/auth/components/login/login.component.ts

// login.component.ts

onSubmit(): void {
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        // artık res.role içi dolu dönüyor
        if (res.role === 'ROLE_ADMIN' || res.role === 'ADMIN') {
          this.router.navigate(['/admin']);
      } else if (res.role === 'ROLE_SELLER') {
          this.router.navigate(['/seller/store-management']);
      } else {
          this.router.navigate(['/products']);
      }

      },
      error: () => alert('Giriş başarısız!'),
    });
  }
}



  goToHome() {
    this.router.navigate(['/products']);
  }

}
