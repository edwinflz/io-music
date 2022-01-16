import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor() {}

  loginUser(credential: Auth) {
    return new Promise((accept, reject) => {
      if (this.validateCredentials(credential))
        accept('Login correcto');
      else
        reject('Login incorrecto');
    });
  }

  validateCredentials(credential: Auth): boolean {
    return credential.email === 'test@test.com' &&
    credential.password === '12345';
  }
}
