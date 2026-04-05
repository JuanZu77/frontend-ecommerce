import { Component, inject, OnInit } from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  private sessionStorageService = inject(SessionStorageService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {

    this.sessionStorageService.removeItem('token');
    this.router.navigate(['/']);
  }

}
