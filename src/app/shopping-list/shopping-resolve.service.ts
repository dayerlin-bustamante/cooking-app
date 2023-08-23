
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "./shopping-list.service";
import { take } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class ShoppingResolveService implements Resolve<Ingredients[]> {
   
    constructor(private shoppingService: ShoppingListService ){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.shoppingService.fetchIngredients().pipe(
            take(1)
        );
    }
}