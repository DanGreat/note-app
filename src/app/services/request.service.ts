import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post(`${this.baseUrl}/user/login`, body)
  }

  register(body: any) {
    return this.http.post(`${this.baseUrl}/user/`, body)
  }

  getNotes() {
    return this.http.get(`${this.baseUrl}/note/`)
  }

  addNote(body: any) {
    return this.http.post(`${this.baseUrl}/note/`, body)
  }

  getNote(noteId: number) {
    return this.http.get(`${this.baseUrl}/note/${noteId}`)
  }

  updateNote(noteId: number, body: any) {
    return this.http.put(`${this.baseUrl}/note/${noteId}`, body)
  }

  deleteNote(noteId: number) {
    return this.http.delete(`${this.baseUrl}/note/${noteId}`)
  }
}
