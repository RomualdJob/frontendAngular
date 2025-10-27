import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JwtService } from '../../../service/jwt.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../service/role.service';
import { Role } from '../../../models/role.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles: Role[] = [];

  constructor(
    private service: JwtService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
      console.log('Rôles chargés:', this.roles);
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  submitForm(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const formData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        roleNames: [this.registerForm.value.role]
      };

      console.log('Données envoyées:', formData);

      this.service.register(formData).subscribe({
        next: (response) => {
          if (response && response.message) {
            alert(response.message);
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error('Erreur d\'inscription:', error);
          alert('Registration failed. Please try again.');
        }
      });
    } else {
      console.log('Formulaire invalide:', this.registerForm.errors);
      alert('Please fill in all required fields correctly.');
    }
  }
}