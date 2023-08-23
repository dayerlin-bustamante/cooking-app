import { Injectable } from "@angular/core";
import { Recipes } from "./recipes.model";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipesService {

    recipesChanged =  new Subject<Recipes[]>();
    private recipes: Recipes[]= [];
    // private recipes: Recipes[]= [
    //     new Recipes('Burger Meat', 'On busy weeknights, getting dinner on the table can be a pain. Luckily, these quick dinner recipes are here to help!', 'https://bakeitwithlove.com/wp-content/uploads/2021/05/McDonalds-The-Travis-Scott-Burger-sq.jpg', [
    //         new Ingredients('Meat', 1),
    //         new Ingredients('Bread', 2)
    //     ]),
    //     new Recipes('Launch', 'On busy weeknights, getting dinner on the table can be a pain. Luckily, these quick dinner recipes are here to help!', 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg', [
    //         new Ingredients('Salad', 2),
    //         new Ingredients('Meat', 1),
    //         new Ingredients('chips', 20)
    //     ])
    // ];
    
    constructor(private serviceShopping: ShoppingListService){}

    setRecipes(recipes: Recipes[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getIdRecipe(index: number){
        return this.recipes[index]
    }

    addIngredintToShoppingList(ingredients: Ingredients[]){
        this.serviceShopping.addedShoppingList(ingredients)
    }

    addRecipe(recipe: Recipes){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe:Recipes){
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }
}