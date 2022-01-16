import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../core/models/auth.interface';
import { AuthenticationService } from '../core/services/authenticate.service';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  validationMessages = {
    email: [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'ojo! este no es un email válido' }
    ],
    password: [
      { type: 'required', message: 'El password es requerido' },
      { type: 'minlength', message: 'Minimo 5 letras para el password' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private storageService: StorageService,
    private router: Router) {}

  get emailField(): AbstractControl {
    return this.loginForm.get('email');
  }

  get passwordField(): AbstractControl {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),]],
        password: ['', [Validators.required, Validators.minLength(5)]],
      }
    );
  }

  public isValid(control: AbstractControl): boolean {
    return control.touched && !control.errors;
  }

  public isInValid(control: AbstractControl): boolean {
    return control.touched && !!control.errors;
  }

  public hasError(type: string, control: AbstractControl): boolean {
    return control.errors[type];
  }

  loginUser(data: Auth): void {
    this.authService.loginUser(data).then(res => {
      this.storageService.set('isUserLoggedIn', true);
      this.router.navigate(['home']);
    })
    .catch(err => this.errorMessage = err);
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }
}
