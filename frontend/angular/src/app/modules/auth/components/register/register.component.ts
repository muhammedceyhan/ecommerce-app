import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  standalone: false
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Kayıt formu oluşturuluyor
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['USER', Validators.required] // varsayılan rol: USER
    });
  }

  // Form gönderildiğinde çalışır
  onSubmit(): void {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Kayıt başarılı!');
        this.router.navigate(['/auth/login']); // Bu doğruysa login sayfasına gider
      },
      error: err => {
        console.error('Kayıt başarısız:', err);
        alert('Kayıt başarısız!');
      }
    });
  }
}
