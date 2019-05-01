import { NgModule } from '@angular/core';
import { 
  MatFormFieldModule,
  MatCheckboxModule, 
  MatButtonModule, 
  MatIconModule,
  MatInputModule ,
  MatSelectModule,
  MatSidenavModule,
  MatMenuModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatListModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatDividerModule,
  MatRippleModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatBottomSheetModule,
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS

} from '@angular/material';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatListModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDividerModule,
    MatRippleModule,
    MatSnackBarModule,
    MatBottomSheetModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } },
    { provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }}
  ]
})
export class MatComponentModule { }