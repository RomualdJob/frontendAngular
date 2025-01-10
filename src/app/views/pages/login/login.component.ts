import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { JwtService } from '../../../service/jwt.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import de HttpClientModule
import { isUndefined } from 'lodash-es';



@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ContainerComponent, HttpClientModule,ReactiveFormsModule,RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialiser loginForm dans le constructeur
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    console.log('Token during ngOnInit:', token);
    
    // Si le token existe, redirige vers la page de liste
   if (token!="undefined") {
      this.router.navigate(['/dashboard']);
    } else {
      // Sinon, initialiser le formulaire de connexion
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]], // Validation de l'email
        password: ['', [Validators.required, Validators.minLength(6)]] // Validation du mot de passe
      });
    }
  }

  // Getter pour les champs du formulaire (email et mot de passe)
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Fonction appelée lors de la soumission du formulaire
  submitForm() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(
        (response) => {
          console.log(response);
          // Sauvegarde du token dans le localStorage
          localStorage.setItem('jwtToken', response.jwt);
          // Redirection vers la page de la liste
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login error: ', error);
          alert('An error occurred. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

}
