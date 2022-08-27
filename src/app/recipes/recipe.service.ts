import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredients } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Italian Pizza",
  //     "An Italian very cheesy pizza",
  //     "https://imgs.search.brave.com/nuE64aTHHE9xVw503WnIMAtuxqKHzY58O_kcD0ESQpw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/aG9oZW9lZDBmYjgx/MS5qcGc_YXV0bz13/ZWJwJnM9ZTM0YzNk/Yjc1NTgzZmQ5YTNk/MzAwZTU4NzFhMDJh/NGQyMjZmNWI5Yg",
  //     [
  //       new Ingredients("Flour", 1),
  //       new Ingredients("Tomato sauce", 1),
  //       new Ingredients("Cheese", 1),
  //     ]
  //   ),
  //   new Recipe(
  //     "Triple Tasty burger",
  //     "The burger that you've been looking for",
  //     "https://imgs.search.brave.com/QIf8sE_72fo6CZwU1rQadbS7S1updLnJ9HuBvQxZwdI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9kMXJh/bHNvZ25qbmczNy5j/bG91ZGZyb250Lm5l/dC9lNTBmMzE2ZS0x/NTIzLTQ3YjItYmUz/ZC1iNGU4NzhiZWRm/OTIuanBlZw",
  //     [
  //       new Ingredients("buns", 2),
  //       new Ingredients("Meat", 3),
  //       new Ingredients("cheese", 4),
  //       new Ingredients("latce", 2),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  constructor(private slService: ShoppingListService) {}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipe() {
    return this.recipes.slice();
  }
  getRecipes(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
