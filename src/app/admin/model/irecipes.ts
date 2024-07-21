import { ICategory } from "./Category";

export interface IRecipes {
  category: ICategory[];
  id: number,
  name: string,
  imagePath: string,
  description: string,
  price: number,
  creationDate: string,
  modificationDate: string,
  tag: ITag;
}

export interface ITag {
  id: number,
  name: string,
  creationDate: string,
  modificationDate: string,
}

export interface IRecipeTable {
  pageNumber: number,
  pageSize: number,
  totalNumberOfRecords: number,
  totalNumberOfPages: number,
  data: IRecipes[]
}
