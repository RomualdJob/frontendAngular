import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '@coreui/angular';

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
  roles: Role[] = [];
  isModalOpen: boolean = false;
  selectedUser: User = { id: 0, name: '', email: '', roles: [], password: '' };
  isAdding: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadRoles(): void {
  this.userService.getAllRoles().subscribe(
    (roles: Role[]) => {
      this.roles = roles;
    },
    (error: any) => {
      console.error('Erreur lors de la récupération des rôles', error);
    }
  );
}

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log("Utilisateurs récupérés:", data);
      },
      (error: any) => {
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
    this.selectedUser = { 
      ...user, 
      roles: [...user.roles]
    };
    this.isAdding = false;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = { id: 0, name: '', email: '', roles: [], password: '' };
  }

  addUser(): void {
    if (this.selectedUser) {
      const userToCreate = {
        name: this.selectedUser.name,
        email: this.selectedUser.email,
        password: this.selectedUser.password,
        roleNames: this.selectedUser.roles
      };

      // Utilisez la méthode correcte de votre service
      this.userService.createUser(userToCreate).subscribe(
        (response: any) => {
          console.log('Nouvel utilisateur ajouté:', response);
          this.loadUsers();
          this.closeModal();
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        }
      );
    }
  }

  updateUser(): void {
    if (this.selectedUser) {
      const userToUpdate = {
        name: this.selectedUser.name,
        email: this.selectedUser.email,
        password: this.selectedUser.password || undefined, // Ne pas envoyer si vide
        roleNames: this.selectedUser.roles
      };

      // Utilisez la méthode correcte de votre service
      this.userService.updateUser(this.selectedUser.id, userToUpdate).subscribe(
        (response: any) => {
          console.log('Utilisateur mis à jour:', response);
          this.loadUsers();
          this.closeModal();
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
          alert('Erreur lors de la mise à jour de l\'utilisateur');
        }
      );
    }
  }

  onSaveUser(): void {
    // Vérifier si les rôles sont valides
    if (this.selectedUser.roles && this.selectedUser.roles.length > 0 && 
        this.selectedUser.roles.every(role => role !== null && role !== '')) {
      if (this.isAdding) {
        this.addUser();
      } else {
        this.updateUser();
      }
    } else {
      alert("L'utilisateur doit avoir au moins un rôle valide.");
    }
  }

  onDeleteUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          console.log('Utilisateur supprimé');
          this.loadUsers();
        },
        (error: any) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      );
    }
  }

  onRoleChange(roleName: string, event: any): void {
    if (event.target.checked) {
      // Ajouter le rôle s'il n'est pas déjà présent
      if (roleName && !this.selectedUser.roles.includes(roleName)) {
        this.selectedUser.roles.push(roleName);
      }
    } else {
      // Supprimer le rôle
      const index = this.selectedUser.roles.indexOf(roleName);
      if (index > -1) {
        this.selectedUser.roles.splice(index, 1);
      }
    }
  }
}