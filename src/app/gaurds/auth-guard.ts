import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const user = await firstValueFrom(authState(auth));
  if (!user) {
    throw new Error('only available for admin user');
  }
  return true;
};
