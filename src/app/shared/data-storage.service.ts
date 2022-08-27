import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeSErvice: RecipeService,
    private authService: AuthService
  ) {}
  storeRecipes() {
    const recipes = this.recipeSErvice.getRecipe();
    this.http
      .put(
        "https://ng-course-recipe-book-37b64-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchData() {
    return this.http
      .get<Recipe[]>(
        "https://ng-course-recipe-book-37b64-default-rtdb.europe-west1.firebasedatabase.app/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeSErvice.setRecipes(recipes);
        })
      );
  }
}
