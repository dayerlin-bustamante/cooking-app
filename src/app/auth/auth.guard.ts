import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { map, take } from "rxjs/operators"

@Injectable({ providedIn: 'root'})
export class AuthGuardian implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |  UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

        // tenemos que detener el obsevable al escucharlo una vez
        return this.authService.user.pipe(take(1), map(user => {
            const isAuthUser = !!user
            if(isAuthUser){
                return true;
            }
            // uso createUrlTree que es parte de la retorno de canActivate (UrlTree) , que permite devolver una url por defecto si no se cumple ese guardian 
            return this.router.createUrlTree(['/auth']);
        }))
    }
}