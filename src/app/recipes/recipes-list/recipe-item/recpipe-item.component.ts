import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../../recipe.model";

@Component({
  selector: "app-recpipe-item",
  templateUrl: "./recpipe-item.component.html",
  styleUrls: ["./recpipe-item.component.css"],
})
export class RecpipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Input() index: number;
  ngOnInit(): void {}
}
