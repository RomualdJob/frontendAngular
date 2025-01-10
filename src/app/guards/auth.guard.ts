// src/app/guards/auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router'; // pour la redirection
import { JwtService } from '../service/jwt.service'; // Assurez-vous d'avoir ce service

// Le guard vérifie la présence du token dans le localStorage
export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService); // Injecter le service
  const router = inject(Router); // Injecter le router pour effectuer la redirection

  // Vérifier si le token existe
  const token = jwtService.getToken(); // méthode pour récupérer le token depuis le localStorage

  console.log('Token récupéré:', token);  // Ajouter un log pour vérifier la valeur du token

  if (token) {
    // Si le token existe, permettre l'accès
    console.log("Token existe");
    return true;
  } else {
    // Si le token n'existe pas, rediriger vers la page de connexion
    router.navigate(['/login']);
    return false;
  }
};
