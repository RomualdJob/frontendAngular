import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Assurez-vous d'importer FormsModule
import { ButtonDirective } from '@coreui/angular'; // Import CoreUI components nécessaires
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { DefaultLayoutComponent } from '../../../layout';
import { DefaultHeaderComponent } from '../../../layout';
import { DefaultFooterComponent } from '../../../layout';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,DefaultLayoutComponent,DefaultFooterComponent,DefaultHeaderComponent,DefaultLayoutComponent,CommonModule, FormsModule, RowComponent, ColComponent, ButtonDirective, DefaultLayoutComponent, DefaultFooterComponent, DefaultHeaderComponent
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = []; // Liste des utilisateurs
  isModalOpen: boolean = false; // Contrôle l'ouverture du modal
  selectedUser: User | null = null; // Utilisateur sélectionné pour la modification
  isAdding: boolean = false; // Indique si on est en mode ajout d'utilisateur

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Charger les utilisateurs dès le début
  }

  onAddUser(): void {
    this.selectedUser = {id: 0,email: '', name: '', role: '',password: '' }; // Initialisation avec un objet vide
    this.isAdding = true; // Passer en mode ajout
    this.isModalOpen = true; // Ouvrir le modal
  }

  // Charger tous les utilisateurs
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  // Ouvrir le modal avec les informations de l'utilisateur
  onEditUser(user: User): void {
    this.selectedUser = { ...user }; // Créer une copie de l'utilisateur sélectionné
    this.isModalOpen = true; // Ouvrir le modal
  }

  addUser(user: User): void {
    this.selectedUser = { ...user }; // Créer une copie de l'utilisateur sélectionné
    this.isModalOpen = true; // Ouvrir le modal
  }


  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null; // Réinitialiser l'utilisateur sélectionné
  }

  // Sauvegarder les modifications de l'utilisateur
  onSaveUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
        (response) => {
          console.log('Utilisateur mis à jour:', response);
          this.loadUsers(); // Recharger la liste des utilisateurs après la mise à jour
          this.closeModal(); // Fermer le modal
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
      );
    }
  }

  // Supprimer un utilisateur
  onDeleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('Utilisateur supprimé');
        this.loadUsers(); // Recharger la liste des utilisateurs après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    );
  }
}
