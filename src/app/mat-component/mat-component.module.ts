import { NgModule } from '@angular/core';
import { 
  MatFormFieldModule,
  MatCheckboxModule, 
  MatButtonModule, 
  MatIconModule,
  MatInputModule ,
  MatSelectModule
} from '@angular/material';


@NgModule({
  exports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MatComponentModule { }