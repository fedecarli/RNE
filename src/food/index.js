// @flow
import {TabNavigator, StackNavigator} from "react-navigation";

import {StackNavigatorOptions, TabNavigatorOptions} from "../components/Navigation";

import Recipes from "./Recipes";
import Category from "./Category";
import Recipe from "./Recipe";
import Restaurants from "./Restaurants";
import Restaurant from "./Restaurant";

const tabs = [
    { key: "Recipes", label: "Recipes", icon: "book" },
    { key: "Restaurants", label: "Restaurants", icon: "map" }
];

const RecipesNavigator = StackNavigator({
    Recipes: { screen: Recipes },
    Category: { screen: Category },
    Recipe: { screen: Recipe }
}, StackNavigatorOptions);

const RestaurantsNavigator = StackNavigator({
    Restaurants: { screen: Restaurants },
    Restaurant: { screen: Restaurant }
}, StackNavigatorOptions);

export const FoodNavigator = TabNavigator({
    Recipes: { screen: RecipesNavigator },
    Restaurants: { screen: RestaurantsNavigator }
}, TabNavigatorOptions(tabs));
