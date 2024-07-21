import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/admin/model/Category';
import { IRecipes, ITag } from 'src/app/admin/model/irecipes';
import { CategoryService } from 'src/app/admin/services/category.service';
import { HelperService } from 'src/app/admin/services/helper.service';
import { RecipesService } from 'src/app/admin/services/recipes.service';


interface IRecipe {
  name: string,
  description: string,
  price: number,
  tagId: number,
  recipeImage: string,
  categoriesIds: number[],
  category?: number[],
  tag?: number[],
}


@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {

  constructor(private _HelperService: HelperService, private _RecipesService: RecipesService, private dialog: MatDialog, private _ToastrService: ToastrService, private _CategoryService: CategoryService, private _Router: Router, private _ActivatedRoute: ActivatedRoute) {

    // console.log(_ActivatedRoute.snapshot.params['id']);
    this.recipeId = _ActivatedRoute.snapshot.params['id'];

  }

  recipeId: number = 0;
  tags: ITag[] = [];
  Categories: ICategory[] = [];
  tagId: number = 0;
  ids: number | any = 0;
  categoriesIds: number = 0;
  files: File[] = [];
  imgSrc: any;
  onAddRecipeMessag: string = '';
  recipeData: IRecipe | any;


  ngOnInit(): void {
    this.getAllTags();
    this.getAllCategory();
    if (this.recipeId > 0) {
      this.getRecipeById(this.recipeId);
    }
  }

  recipeForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    price: new FormControl(null, [Validators.required]),
    tagId: new FormControl(null, [Validators.required]),
    recipeImage: new FormControl(null, [Validators.required]),
    categoriesIds: new FormControl(null, [Validators.required]),
  })

  onSubmit(recipeData: FormGroup) {
    console.log(recipeData.value)
    recipeData.value.id = this.recipeId
    let myData = new FormData();
    myData.append('name', recipeData.value.name)
    myData.append('description', recipeData.value.description)
    myData.append('price', recipeData.value.price)
    myData.append('tagId', recipeData.value.tagId)
    myData.append('categoriesIds', recipeData.value.categoriesIds)
    myData.append('recipeImage', this.imgSrc)

    if (this.recipeId) {
      myData.append('id', recipeData.value.id)
      this.editeRecipe(myData);
    } else {
      this.addRecipe(myData)
    }
  }



  getAllCategory() {
    this._CategoryService.getAllCategory(1000, 1, '').subscribe({
      next: (response) => {
        console.log(response.data)
        this.Categories = response.data;
      }
    })
  }

  getAllTags() {
    this._HelperService.getAllRecipe().subscribe({
      next: (response) => {
        console.log(response)
        this.tags = response;
      }
    })
  }

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    console.log(this.imgSrc)
    this.files.push(...event.addedFiles)
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1)
  }


  goToRecipe() {
    this._Router.navigate(['/dashboard/admin/recipes'])
  }


  editeRecipe(myData: any) {
    this._RecipesService.onEditeRecipe(this.recipeId, myData).subscribe({
      next: (response) => {
        this.onAddRecipeMessag = response.message;
        console.log(response.message)
      }, error: (err) => {
        this._ToastrService.error('error !')
      }, complete: () => {
        this._ToastrService.success(`${this.onAddRecipeMessag}`);
        this._Router.navigate(['/dashboard/admin/recipes']);
      },
    })
  }

  addRecipe(myData: any) {
    this._RecipesService.onAddRecipe(myData).subscribe({
      next: (response) => {
        this.onAddRecipeMessag = response.message;
        console.log(response.message)
      }, error: (err) => {
        this._ToastrService.error('error !')
      }, complete: () => {
        this._ToastrService.success(`${this.onAddRecipeMessag}`);
        this._Router.navigate(['/dashboard/admin/recipes']);
      },
    })
  }


  getRecipeById(id: number) {
    this._RecipesService.getRecipeById(id).subscribe({
      next: (res: IRecipe) => {
        this.recipeData = res
      }, error: () => {
      }, complete: () => {
        // let arr: any[] = [...this.recipeData.category]
        // this.ids = arr.map(x => x.id);

        this.recipeForm.patchValue({
          name: this.recipeData.name,
          description: this.recipeData.description,
          price: this.recipeData.price,
          tagId: this.recipeData.tag.id,
          recipeImage: this.recipeData.recipeImage,
          categoriesIds: this.recipeData.category.map((x: any) => x.id),
        })
      }
    })
  }
}





