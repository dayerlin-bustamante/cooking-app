import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[];
 
  private ingredintsChangedSub: Subscription;

  imageUrls: { [key: string]: string } = {};
  imgExist: boolean = true;

  constructor(private serviceShopping: ShoppingListService){}

  ngOnInit() {

    this.ingredients = this.serviceShopping.getIngredients()
    this.ingredintsChangedSub = this.serviceShopping.ingredintsChanged.subscribe((ingred: Ingredients[]) => {
      this.ingredients = ingred;
    });

    this.loadImages()
  }

  onEdidIngredinet(index: number){
    this.serviceShopping.edditIngredient.next(index);
    this.loadImages()
  }

  ngOnDestroy() {
    this.ingredintsChangedSub.unsubscribe();
  }

  loadImages() {
    this.ingredients.forEach(ingredient => {
      const imageUrl = `../../assets/svg/${ingredient.name.toLowerCase()}.svg`;
      const img = new Image();
      
      img.onload = () => {
        console.log('Estoy en correcto');
        this.imageUrls[ingredient.name] = imageUrl;
        this.imgExist = true;
        return;
      };
      
      img.onerror = () => {
        console.log('Estoy en error');
        this.imgExist = false;
        this.imageUrls[ingredient.name] = '../../assets/svg/dafault.svg';
        return;
      };
      
      img.src = imageUrl;
    });
  }
}
