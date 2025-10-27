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
  isLoading: boolean = true;
  errorLoadingRoles: boolean = false;

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
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.errorLoadingRoles = false;
    
    this.roleService.getAllRoles().subscribe({
      next: (roles: Role[]) => {
        console.log('Rôles reçus:', roles); // Debug
        this.roles = roles || [];
        this.isLoading = false;
        
        if (this.roles.length === 0) {
          console.warn('Aucun rôle trouvé');
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des rôles:', error);
        this.errorLoadingRoles = true;
        this.isLoading = false;
        this.roles = [];
      }
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