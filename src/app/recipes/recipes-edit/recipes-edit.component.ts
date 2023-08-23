import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipes } from '../recipes.model';
import { DataBaseService } from 'src/app/shared/data-base.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss']
})
export class RecipesEditComponent implements OnInit {
  refForms: FormGroup;
  id: number;
  editModo = false;

  constructor(private router:ActivatedRoute, private  recipesServices: RecipesService, private route: Router, private DataBaseService: DataBaseService ){}

  ngOnInit() {
    this.router.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.editModo = params['id'] != null;
      this.initialForm()
    })
  }

  onSubmit() {
    const newRecipe = new Recipes(
      this.refForms.value['name'],
      this.refForms.value['description'],
      this.refForms.value['imagePath'],
      this.refForms.value['ingredients']
    )
    if(this.editModo){
      this.recipesServices.updateRecipe(this.id, newRecipe)
    } else {
      this.recipesServices.addRecipe(newRecipe)
    }
    this.onCancel()
    this.onSaveDataBase()

  }
  onSaveDataBase(){
    this.DataBaseService.storageRecepies()
  }
  onCancel() {
    this.route.navigate(['../'], {relativeTo: this.router})
  }
  onDeleteIngredient(index: number){
    (<FormArray>this.refForms.get('ingredients')).removeAt(index)
  }

  addNewIngredient(){
    (<FormArray>this.refForms.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    )
  }
  // un array con formGroups de formControl siempre usa <FormArray> para acceder a ese array y luego poder manipularlo
  controls(){
    return (<FormArray>this.refForms.get('ingredients')).controls;
  }
  initialForm(){
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let ingredientsArray = new FormArray([])

    if(this.editModo){
      const editItem = this.recipesServices.getIdRecipe(this.id)
      recipeName = editItem.name;
      imagePath = editItem.imagePath
      description = editItem.description
      if(editItem['ingredients']){
        for (let ingredient of editItem.ingredients){
          ingredientsArray.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            })
          )
        }
      }
    }

    this.refForms =  new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredientsArray,
    })
  }
}
