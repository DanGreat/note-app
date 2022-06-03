import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import {MatDialog} from '@angular/material/dialog';
import { AddNoteComponent } from './add-note/add-note.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private request: RequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNotes()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getNotes() {
    this.request.getNotes().subscribe({
      next: (response) => {
        console.log('Notes: ', response);
        
      }
    })
  }

  addOrEditNote(noteId?: number) {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      // width: '250px',
      data: { noteId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
