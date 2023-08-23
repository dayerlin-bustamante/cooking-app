import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipes } from "./recipes.model";
import { DataBaseService } from "../shared/data-base.service"
import { RecipesService } from "./recipes.service";

@Injectable({
    providedIn: 'root'
})
// Resolve modulo de rauter es un gancho que se encarda de cargar datos antes de una ruta
export class RecepiesResolveService implements Resolve<Recipes[]> {
    // resolve() siempre debe tener return
    constructor(private DataBaseService: DataBaseService, private recipesServices: RecipesService, ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // revolve ya trae subcription
        const recipes = this.recipesServices.getRecipes()

        if(recipes.length === 0) {
            return this.DataBaseService.fetchData();
        } else {
            return recipes;
        }
    }
}