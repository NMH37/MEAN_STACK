import { NgModule } from '@angular/core';
import {
  MatInputModule, MatCardModule,
  MatButtonModule, MatToolbarModule,
  MatExpansionModule, MatDialogModule
} from '@angular/material';

@NgModule({
  exports: [MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule]
})
export class AngularMaterialModule { }
