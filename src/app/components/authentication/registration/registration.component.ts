import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../common/user';
import { UserType } from '../../../common/user-type';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);
  private toastr = inject(ToastrService);

  username: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  cellphone: string = '';
  userType: string = '';

  ngOnInit(): void {
  }

  register(): void {

    const user: User = {
      userName: this.email,
      firstName: this.name,
      lastName: this.surname,
      email: this.email,
      address: this.address,
      password: this.password,
      userType: UserType.USER,
      cellphone: this.cellphone

    };

    this.authenticationService.register(user).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['user/login']);
        this.toastr.success('Registration successful! Please log in.', 'Success');
      },
      error: (error) => {
        console.error('Error registering user', error);
        this.toastr.error('Registration failed. Please try again.', 'Error');
      }
    });

  }

}
