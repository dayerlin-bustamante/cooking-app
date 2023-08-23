import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipes/recipes.module").then(classModule => classModule.RecipesModule)
  },
  {
    path: "shopping",
    loadChildren: () =>
      import("./shopping-list/shopping-list.module").then(
        classModule => classModule.ShoppingListModule
      )
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(classModule => classModule.AuthModule)
  }
];

@NgModule({
    // Aparte de tener el lazyLoad para cargar por parte lo que se necesite 
    // tambien podemos hacer un precarga de todo los modulos añadiendo al RouterModule esta propiedad : preloadingStrategy como objeto 
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
