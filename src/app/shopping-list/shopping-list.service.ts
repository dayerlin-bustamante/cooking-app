import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ShoppingListService {

  edditIngredient = new Subject<number>();
  ingredintsChanged =  new Subject<Ingredients[]>();

  private ingredients: Ingredients[] = [
    // new Ingredients('apples', 5),
    // new Ingredients('tomate', 10)
  ];

  constructor(private http: HttpClient){}

  storageIngredient(){
    const ingredients = this.ingredients

    this.http.put('https://cooking-app-74bd6-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', ingredients).subscribe(ingredients => {
        console.log(ingredients);
    })
  }

  fetchIngredients(){
    return this.http.get<Ingredients[]>('https://cooking-app-74bd6-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
    ).pipe( map(ingredients => this.ingredients = ingredients || []),
        catchError(error => {
          console.error(error);
          return [];
        })
    )
  }
  
  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredint(ingredient: Ingredients) {
    this.ingredients.push(ingredient)
    this.ingredintsChanged.next(this.ingredients.slice())
  }
  addedShoppingList(ingredient: Ingredients[]){
    this.ingredients.push(...ingredient)
    this.ingredintsChanged.next(this.ingredients.slice())
    this.storageIngredient()
  }
  getEditIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index:number , newIngredient:Ingredients){
    this.ingredients[index] = newIngredient;
    this.ingredintsChanged.next(this.ingredients.slice())
    this.storageIngredient()
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
    this.ingredintsChanged.next(this.ingredients.slice())
    this.storageIngredient()
  }
}
