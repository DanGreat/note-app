import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CanViewNotesGuard } from 'src/app/guards/can-view-notes/can-view-notes.guard';


const route: Routes = [
  {
    path: '',
    component: NotesComponent,
    canActivate: [CanViewNotesGuard]
  }
]

@NgModule({
  declarations: [NotesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(route)
  ],
})

export class NotesModule { }
