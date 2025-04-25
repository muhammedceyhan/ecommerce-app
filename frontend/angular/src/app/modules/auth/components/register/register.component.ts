import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  standalone: false,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Kayıt formu oluşturuluyor
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['USER', Validators.required], // varsayılan rol: USER
    });
  }

  // register.component.ts
  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const { fullName, email, password, role } = this.registerForm.value;
    this.authService.register({ fullName, email, password, role })
      .subscribe({
        next: () => {
          alert('Kayıt başarılı!');
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          console.error('Register error:', err);
          // err.error büyük ihtimalle back-end’in gönderdiği mesajı içeren obje
          const msg = err.error?.message || JSON.stringify(err.error) || err.statusText;
          alert(`Kayıt başarısız: ${msg}`);
        }
      });
  }



  // Geri butonuna tıklandığında çalışır
  goBack(): void {
    this.router.navigate(['/login']);
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        // Handle successful registration
      },
      (error) => {
        // Handle registration error
      }
    );
  }
}
