import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JwtService } from '../../../service/jwt.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../service/user.service';  
import { Role } from '../../../models/role.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles: Role[] = [];  

  constructor(
    private service: JwtService,
    private userService: UserService,  
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      roleNames: [[], [Validators.required]]
    }, { validators: this.passwordMatchValidator });  
  }

  ngOnInit(): void {
    this.userService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;  
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onRoleChange(roleName: string, event: any) {
    const roleNames = this.registerForm.get('roleNames')?.value;
    if (event.target.checked) {
      roleNames.push(roleName);
    } else {
      const index = roleNames.indexOf(roleName);
      if (index !== -1) {
        roleNames.splice(index, 1);
      }
    }
    this.registerForm.get('roleNames')?.setValue(roleNames);
  }

  submitForm() {
    if (this.registerForm.valid) {
      const formData = {
        ...this.registerForm.value,
        roleNames: this.registerForm.value.roleNames  
      };

      this.service.register(formData).subscribe(
        (response) => {
          if (response && response.message) {
            alert(response.message);  
          }
        },
        (error) => {
          alert('Registration failed. Please try again.');  
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
