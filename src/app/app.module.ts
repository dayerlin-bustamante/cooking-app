import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}














// TODO: VIEJO APP MODULE

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// import { HeaderComponent } from './header/header.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
// import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
// import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
// import { DropdownDirective } from './shared/dropdown.directive';
// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
// import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
// import { RecipesService } from './recipes/recipes.service';
// import { FooterComponent } from './footer/footer.component';
// import { SpinnerComponent } from './shared/spinner/spinner.component';
// import { AuthComponent } from './auth/auth.component';
// import { AuthInterceptorService } from './auth/auth.interceptor.service';

// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     RecipesComponent,
//     RecipesListComponent,
//     RecipesDetailComponent,
//     RecipesItemComponent,
//     ShoppingListComponent,
//     ShoppingEditComponent,
//     DropdownDirective,
//     RecipesStartComponent,
//     RecipesEditComponent,
//     FooterComponent,
//     SpinnerComponent,
//     AuthComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule
//   ],
//   providers: [ShoppingListService, RecipesService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
