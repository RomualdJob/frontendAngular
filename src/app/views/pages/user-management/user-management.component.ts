import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.model';  // Assurez-vous que le modèle Role est importé
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '@coreui/angular'; // Import CoreUI components nécessaires

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonDirective
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = []; // Ajouter une variable pour stocker les rôles disponibles
  isModalOpen: boolean = false;
  selectedUser: User = { id: 0, name: '', email: '', roles: [], password: '' };
  isAdding: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();  // Charger les rôles à l'initialisation
  }

  loadRoles(): void {
    // Charger les rôles depuis le backend
    this.userService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Erreur lors de la récupération des rôles', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log("Utilisateurs récupérés:", data); // Afficher les utilisateurs dans la console
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  onAddUser(): void {
    this.selectedUser = { id: 0, name: '', email: '', roles: ['USER'], password: '' };
    this.isAdding = true;
    this.isModalOpen = true;
  }

  onEditUser(user: User): void {
    this.selectedUser = { ...user };
    this.isAdding = false;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    if (this.isAdding) {
      this.selectedUser = { id: 0, name: '', email: '', roles: [], password: '' };
    }
  }

  addUser(): void {
    if (this.selectedUser) {
      // Transformer l'objet avant l'envoi à l'API
      const transformedUser = {
        ...this.selectedUser,
        roleNames: this.selectedUser.roles  // Transformation des rôles en roleNames
      };
  
      this.userService.addUser(transformedUser).subscribe(
        (response) => {
          console.log('Nouvel utilisateur ajouté:', response);
          this.loadUsers();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        }
      );
    }
  }
  

  updateUser(): void {
    if (this.selectedUser) {
      // Créer un objet avec la structure attendue par l'API (changer 'roles' en 'roleNames')
      const transformedUser = {
        ...this.selectedUser,
        roleNames: this.selectedUser.roles  // Transformation des rôles en roleNames
      };
  
      // Envoi de la requête avec la structure modifiée
      this.userService.updateUser(this.selectedUser.id, transformedUser).subscribe(
        (response) => {
          console.log('Utilisateur mis à jour:', response);
          this.loadUsers();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      );
    }
  }
  

  onSaveUser(): void {
    // Vérifier si les rôles sont vides ou contiennent des valeurs invalides (null ou vide)
    if (this.selectedUser.roles && this.selectedUser.roles.length > 0 && this.selectedUser.roles.every(role => role !== null && role !== '')) {
      if (this.isAdding) {
        this.addUser();
      } else {
        this.updateUser();
      }
    } else {
      // Afficher un message d'erreur si les rôles sont invalides
      alert("L'utilisateur doit avoir au moins un rôle valide.");
    }
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('Utilisateur supprimé');
        this.loadUsers();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    );
  }

  onRoleChange(roleName: string, event: any): void {
    // Si l'événement indique que la case est cochée
    if (event.target.checked) {
      // On ajoute le rôle si ce n'est pas null
      if (roleName && !this.selectedUser.roles.includes(roleName)) {
        this.selectedUser.roles.push(roleName);
      }
    } else {
      // Si la case est décochée, on supprime le rôle
      const index = this.selectedUser.roles.indexOf(roleName);
      if (index > -1) {
        this.selectedUser.roles.splice(index, 1);
      }
    }
  }
  
}
