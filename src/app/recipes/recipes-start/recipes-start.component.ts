import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-start',
  templateUrl: './recipes-start.component.html',
  styleUrls: ['./recipes-start.component.scss']
})
export class RecipesStartComponent implements OnInit {
  recipes: any[] = [];
  recipesRandom: any;
  
  constructor(private http: HttpClient) { }

  ngOnInit()  {
    this.http.get<any[]>('/assets/recipes.json').subscribe(data => {
      this.recipes = data;
      this.actualizarRecipesRandom();
    });

    setInterval(() => {
      this.actualizarRecipesRandom();
    }, 200000);
  }

  actualizarRecipesRandom(): void {
    const indiceAleatorio = Math.floor(Math.random() * this.recipes.length);
    this.recipesRandom = this.recipes[indiceAleatorio];
  }
}
