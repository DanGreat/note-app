import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddUpdateNoteComponent } from 'src/app/components/add-update-note/add-update-note.component';
import { ViewNoteComponent } from 'src/app/components/view-note/view-note.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['S/N', 'Created By', 'Email', 'Note Title', 'Created At', 'Actions'];
  dataSource: any;

  constructor(private request: RequestService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNotes()
  }

  getNotes() {
    this.request.getNotes().subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource<any>(response?.data);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  addOrUpdateNote(noteId?: number) {
    this.dialog.open(AddUpdateNoteComponent, {
      width: '30%',
      data: { noteId }
    });
  }

  viewNote(noteId?: number) {
    this.dialog.open(ViewNoteComponent, {
      width: '30%',
      data: { noteId }
    });
  }

  deleteNote(noteId: number) {
    const shouldDelete = confirm('Are you sure you want to delete this note?')

    if(shouldDelete) {
      this.request.deleteNote(noteId).subscribe({
        next: (response: any) => {
          if(response?.status === 'success'){
            alert(response?.message)
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

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
