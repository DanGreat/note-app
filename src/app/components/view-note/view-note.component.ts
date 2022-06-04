import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { AddUpdateNoteComponent } from '../add-update-note/add-update-note.component';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss']
})
export class ViewNoteComponent implements OnInit {

  noteId;
  note: any;

  constructor(public dialogRef: MatDialogRef<AddUpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
                            private request: RequestService) { 

      this.noteId = data?.noteId
      if(this.noteId) {
        this.getNote(this.noteId);
      }
    }

  ngOnInit(): void {
  }

  getNote(noteId: number) {
    this.request.getNote(noteId).subscribe({
      next: (response: any) => {
        if(response?.status === 'success') {
          this.note = response?.data
        }
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

}
