import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CanViewNotesGuard } from 'src/app/guards/can-view-notes/can-view-notes.guard';
import { AddUpdateNoteComponent } from 'src/app/components/add-update-note/add-update-note.component';
import { ViewNoteComponent } from 'src/app/components/view-note/view-note.component';


const route: Routes = [
  {
    path: '',
    component: NotesComponent,
    canActivate: [CanViewNotesGuard]
  }
]

@NgModule({
  declarations: [NotesComponent, AddUpdateNoteComponent, ViewNoteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(route)
  ],
  exports: [AddUpdateNoteComponent, ViewNoteComponent]
})

export class NotesModule { }
