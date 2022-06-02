import { HttpClient } from '@angular/common/http';
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
}
