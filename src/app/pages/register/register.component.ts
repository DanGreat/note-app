import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private request: RequestService) {

    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

   }

  ngOnInit(): void { 
  }

  get registerControls() {
    return this.registerForm.controls
  }

  register(): void {
    console.log('Form Value: ', this.registerForm.value);
    this.request.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        console.log('Registeration Response: ', response);
        if(response?.status == 'success') {
          alert(response?.message)
          this.router.navigate(['/login'])
        }
      }
    })
  }

}
