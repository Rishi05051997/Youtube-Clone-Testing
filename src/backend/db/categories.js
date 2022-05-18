import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "all",
  },
  {
    _id: uuid(),
    categoryName: "hatchback",
  },
  {
    _id: uuid(),
    categoryName: "sedan",
  },
  {
    _id: uuid(),
    categoryName: "suv",
  },
];
