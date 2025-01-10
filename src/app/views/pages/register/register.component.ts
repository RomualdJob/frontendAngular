import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JwtService } from '../../../service/jwt.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    ReactiveFormsModule,  // Assurez-vous que ReactiveFormsModule est bien ici
    HttpClientModule      // Assurez-vous que HttpClientModule est ici si nécessaire
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      roleName: ['USER', [Validators.required]]
    }, { validators: this.passwordMatchValidator });  // Validation des mots de passe
  }

  ngOnInit(): void {
    // Initialisation du composant
  }

  // Validator pour s'assurer que les mots de passe correspondent
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  // Soumission du formulaire
  submitForm() {
    console.log('submitForm() called');  // Vérifie si la méthode est appelée
    if (this.registerForm.valid) {
      console.log('Form data:', this.registerForm.value);  // Affiche les données du formulaire
      this.service.register(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registration response:', response);  // Affiche la réponse du backend
          if (response && response.message) {
            alert(response.message);
          }
        },
        (error) => {
          console.error('Registration error:', error);  // Affiche l'erreur du backend
          if (error.status === 400 && error.error && error.error.message) {
            alert(error.error.message);
          } else {
            alert('Registration failed. Please try again.');
          }
        }
      );
    } else {
      console.log('Form is invalid');
      alert('Please fill in all required fields.');
    }
  }
  
}
