import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '../../../app/layout';
import { DefaultHeaderComponent } from '../../../app/layout';
import { DefaultFooterComponent } from '../../../app/layout';

export const routes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  }
  
  ,
  {
    path: 'user-management',
    loadComponent: () => import('./user-management/user-management.component').then(m => m.UserManagementComponent),
    data: {
      title: 'User Management Page'
    }
  },


  {
    path: 'mission-management',
    loadComponent: () => import('./mission-management/mission-management.component').then(m => m.MissionManagementComponent),
    data: {
      title: 'Mission Management Page'
    }
  },


 
];
