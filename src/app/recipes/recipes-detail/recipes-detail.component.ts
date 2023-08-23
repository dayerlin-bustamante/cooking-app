import { Component, OnInit } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataBaseService } from 'src/app/shared/data-base.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipes;
  id: number;

  constructor(private recipesServices: RecipesService, private route:ActivatedRoute, private router: Router, private DataBaseService: DataBaseService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.recipe = this.recipesServices.getIdRecipe(this.id)
    })
  }
  
  onAddShoppingList(){
    this.recipesServices.addIngredintToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe(){
    this.router.navigate(['edit'], { relativeTo: this.route })
  }
  onDelete() {
    this.recipesServices.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
    this.DataBaseService.storageRecepies()
  }
}
