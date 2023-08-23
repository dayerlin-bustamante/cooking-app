import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";
import { Recipes } from "../recipes/recipes.model";
import { map, tap } from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class DataBaseService {
    constructor(private http: HttpClient, private recipesServices: RecipesService ){}

    storageRecepies(){

        const recipes = this.recipesServices.getRecipes();
        this.http.put('https://cooking-app-74bd6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(recipe => {
            console.log(recipe);
        })
    }

    fetchData(){
    
        return this.http.get<Recipes[]>('https://cooking-app-74bd6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        // otra forma es pasarlo directo :
        // return this.http.get<Recipes[]>('https://cooking-app-74bd6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=' + user.token)
        ).pipe( map(recipe => {
            return recipe.map(recipe=> {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
        }),tap(recipes => {
            this.recipesServices.setRecipes(recipes)
        }))
    }
}