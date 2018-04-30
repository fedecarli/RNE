// @flow
import type {Picture, Location} from "../../components/Model";

const recipes = require("./recipes");
const restaurants = require("./restaurants");

export type Category = {
    id: string,
    title: string,
    subtitle: string,
    picture: Picture
};

export type Ingredient = {
    checked: boolean,
    name: string,
    quantity: string
};

export type Recipe = {
    id: string,
    title: string,
    people: number,
    minutes: number,
    picture: Picture,
    instructions: string[],
    ingredients: Ingredient[]
};

export type Restaurant = {
    id: string,
    title: string,
    subtitle: string,
    ratings: number,
    reviews: number,
    picture: Picture,
    coordinate: Location,
    address: string,
    city: string,
    country: string,
    description: string,
    price: {
        from: number,
        to: number,
        expensive: number
    },
    openings: {
        from: string,
        to: string
    }
};

export type Food = {
    categories: Category[],
    recipes: { [category: string]: Recipe[] },
    restaurants: Restaurant[]
};

const api: Food = {
    categories: recipes.categories,
    recipes: recipes.recipes,
    restaurants
};

export default api;
