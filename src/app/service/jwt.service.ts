// src/app/service/jwt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';  // Importation du service de cookies
import { Router } from '@angular/router';

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService // Injection du service de cookies
  ) { }

  // Enregistrer un nouvel utilisateur
  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest);
  }

  // Connexion de l'utilisateur et obtenir un token
  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest);
  }

  // Déconnexion de l'utilisateur
  logout() {
    // Supprimer le token du cookie
    this.cookieService.delete('jwtToken');
    console.log('Token supprimé');
    
    // Rediriger l'utilisateur vers la page de login
    this.router.navigate(['/login']);
  }

  // Vérifie si l'utilisateur est connecté en vérifiant la présence du token dans le cookie
  isLoggedIn(): boolean {
    return !!this.cookieService.get('jwtToken');  // Retourne true si le token est présent, sinon false
  }

  // Méthode pour récupérer le token depuis le cookie
  getToken(): string | null {
    return this.cookieService.get('jwtToken');
  }

  // Méthode pour sauvegarder le token dans un cookie de session
  saveToken(token: string): void {
    // Le cookie est un cookie de session, il sera automatiquement supprimé lorsque le navigateur sera fermé
    this.cookieService.set('jwtToken', token);
  }
  
}
