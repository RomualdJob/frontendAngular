import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation, withHashLocation, withInMemoryScrolling, withRouterConfig, withViewTransitions } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Importation de HttpClientModule
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Importation de FormsModule et ReactiveFormsModule
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(
      SidebarModule,
      DropdownModule,
      ReactiveFormsModule,
      FormsModule,  // Ajout de FormsModule ici
      HttpClientModule  // Ajout du HttpClientModule ici
    ),
    IconSetService,
    provideAnimations()
  ]
};
