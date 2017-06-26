import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SplitService } from '../services/split.service';

@Injectable()
export class CanActivateGuard implements CanActivate {
	constructor(private splitService: SplitService, private router: Router) {}
	/**
     * override canActivate
     * @returns {boolean}
     */
    canActivate() {
        //TODO return  value for routes
		if(!this.splitService.isBasicSplitDataAvailable){
			this.router.navigate(['/home']);
			return true;
		}else{
			return true;
		}
    }
}