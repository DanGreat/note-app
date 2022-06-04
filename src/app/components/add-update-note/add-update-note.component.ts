import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-add-update-note',
  templateUrl: './add-update-note.component.html',
  styleUrls: ['./add-update-note.component.scss']
})
export class AddUpdateNoteComponent implements OnInit {

  noteForm: FormGroup
  noteId;

  constructor(public dialogRef: MatDialogRef<AddUpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
                            private formbuilder: FormBuilder,
                            private router: Router,
                            private request: RequestService) { 

      this.noteForm = this.formbuilder.group({
        title: ['', [Validators.required]],
        content: ['', [Validators.required]]
      })

      this.noteId = data?.noteId
      if(this.noteId) {
        this.getNote(this.noteId);
      }
    }

  ngOnInit(): void {
  }

  get noteControls() {
    return this.noteForm.controls
  }

  addOrUpdate() {
    if(this.noteId) {
      this.request.updateNote(this.noteId, this.noteForm.value).subscribe({
        next: (response: any) => {  
          if(response?.status === 'success') {
            alert('Note Updated successfully')
            this.close()
            this.reloadPage()
          }
        }
      }) 
    } else {
      this.request.addNote(this.noteForm.value).subscribe({
        next: (response: any) => {  
          if(response?.status === 'success') {
            alert('Note added successfully')
            this.close()
            this.reloadPage()
          }
        }
      }) 
    }   
  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/notes']);
  }

  getNote(noteId: number) {
    this.request.getNote(noteId).subscribe({
      next: (response: any) => {
        if(response?.status === 'success') {
          this.noteForm.patchValue({
            title: response?.data?.title,
            content: response?.data?.content
          })
        }
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

}
