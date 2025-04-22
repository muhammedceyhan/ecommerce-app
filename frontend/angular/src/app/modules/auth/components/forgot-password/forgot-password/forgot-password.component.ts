import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: false,
})
export class ForgotPasswordComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Bu kısım backend ile entegre edilince çalışır
      alert('Eğer bu e-posta sisteme kayıtlıysa şifre sıfırlama bağlantısı gönderilecektir.');
    }
  }
}
