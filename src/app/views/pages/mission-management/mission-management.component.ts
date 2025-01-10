import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { DefaultLayoutComponent } from 'src/app/layout';
import { DefaultHeaderComponent } from 'src/app/layout';
import { DefaultFooterComponent } from 'src/app/layout';

@Component({
  selector: 'app-mission-management',
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,DefaultLayoutComponent,DefaultFooterComponent,DefaultHeaderComponent,DefaultLayoutComponent],
  templateUrl: './mission-management.component.html',
  styleUrl: './mission-management.component.scss'
})
export class MissionManagementComponent {

}
