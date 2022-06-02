import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CanViewNotesGuard } from 'src/app/guards/can-view-notes/can-view-notes.guard';
import { AddNoteComponent } from './add-note/add-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { ViewNoteComponent } from './view-note/view-note.component';


const route: Routes = [
  {
    path: '',
    component: NotesComponent,
    canActivate: [CanViewNotesGuard],
    children: [
      {
        path: '/add',
        component: AddNoteComponent
      },
      {
        path: '/update',
        component: UpdateNoteComponent
      },
      {
        path: '/view',
        component: ViewNoteComponent
      }
    ]
  }
]

@NgModule({
  declarations: [NotesComponent, AddNoteComponent, UpdateNoteComponent, ViewNoteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(route)
  ],
})

export class NotesModule { }
