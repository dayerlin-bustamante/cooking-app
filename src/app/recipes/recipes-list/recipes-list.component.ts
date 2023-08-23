import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataBaseService } from 'src/app/shared/data-base.service';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  // recipes: Recipes[]= [
  //   new Recipes('test recipes', 'this is a test', 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg'),
  //   new Recipes('test recipes', 'this is a test', 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg')
  // ];

  recipes:Recipes[];
  private recipeSubscription: Subscription;

  constructor(private recipesServices: RecipesService, private router: Router, private route: ActivatedRoute, private DataBaseService: DataBaseService) {}

  ngOnInit() {
    this.recipeSubscription = this.recipesServices.recipesChanged.subscribe((recipe: Recipes[])=>{
      this.recipes = recipe;
    })
    this.recipes = this.recipesServices.getRecipes();

    // todo: Activo esta linea si quiero que las recetas aparezcan sin tener de dar click
    // this.onFetchDataBase()
  }
  
  onNewRecipe(){
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  // onSaveDataBase(){
  //   this.DataBaseService.storageRecepies()
  // }

  onFetchDataBase(){
    this.DataBaseService.fetchData().subscribe();
  }
  
  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
