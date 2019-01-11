import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })

export class UnauthorizedGuard implements CanActivateChild {
  constructor(private userService: UserService) {}

  public canActivateChild(): boolean {
    return !this.userService.isLogged();
  }
}
