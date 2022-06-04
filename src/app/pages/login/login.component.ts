import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private cookieService: CookieService,
              private request: RequestService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
   }

  ngOnInit(): void { 
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  login(): void {
    console.log('Form Value: ', this.loginForm.value);
    this.request.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        if(response[0]?.status == 'success') {
          localStorage.setItem('isAuthenticated', 'true')
          alert(response[0]?.message)
          this.router.navigate(['/notes'])
          return
        }

        localStorage.setItem('isAuthenticated', 'false')
      }
    })
  }
}
