import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('f') refForm: NgForm;

  subscription: Subscription;
  indexIngredient: number;
  editMode =  false;
  editIngredient: Ingredients;

  constructor(private serviceShopping: ShoppingListService){}

  ngOnInit() {
    this.subscription = this.serviceShopping.edditIngredient.subscribe((index: number)=>{
      this.indexIngredient = index;
      this.editMode = true;
      this.editIngredient =  this.serviceShopping.getEditIngredient(index)
      this.refForm.setValue({
        name: this.editIngredient.name,
        amount: this.editIngredient.amount
      })
    })
  }
  addElement(form: NgForm){
    
    const value = form.value

    const NowIngredient = new Ingredients(value.name,value.amount);
    if(this.editMode) {
      this.serviceShopping.updateIngredient(this.indexIngredient, NowIngredient)
    } else {
      this.serviceShopping.addIngredint(NowIngredient);
      this.serviceShopping.storageIngredient()
    }
    this.editMode = false;
    form.reset()
  }

  clearIngredient() {
    this.editMode = false;
    this.refForm.reset()
  }

  onDelete() {
    this.serviceShopping.deleteIngredient(this.indexIngredient)
    this.clearIngredient()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
