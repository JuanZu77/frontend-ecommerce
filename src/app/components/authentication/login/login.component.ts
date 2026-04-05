import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Userdto } from '../../../common/userdto';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  private authenticationService = inject(AuthenticationService);
  private sessionStorageService = inject(SessionStorageService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {

    const userDto : Userdto = {
      username: this.username,
      password: this.password
    };

    this.authenticationService.login(userDto).subscribe({
      next: (token) => {
        console.log('Login successful:', token);
        this.sessionStorageService.setItem('token', token);

        if (token.type == 'ADMIN') {
          this.router.navigate(['admin/product']);
        } else {
          this.router.navigate(['']);
        }

      },
      error: (error) => {
        console.error('Login failed:', error);
       
      } 
    });
  }

}
