import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameService } from './game.service';

export const gameExists: CanActivateFn = () => {
  const router = inject(Router);
  const gameService = inject(GameService);
  if (!gameService.game()) {
    router.navigate(['home']);
    return false;
  }

  return true;
};
