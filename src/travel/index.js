// @flow
import {TabNavigator, StackNavigator} from "react-navigation";

import {StackNavigatorOptions, TabNavigatorOptions} from "../components/Navigation";

import Cities from "./Cities";
import City from "./City";
import Restaurants from "./Restaurants";
import Hotels from "./Hotels";
import Guides from "./Guides";
import Guide from "./Guide";

const tabs = [
    { key: "Guides", label: "Guides", icon: "book" },
    { key: "Cities", label: "Cities", icon: "map" }
];

const CitiesNavigator = StackNavigator({
    Cities: { screen: Cities },
    City: { screen: City },
    Restaurants: { screen: Restaurants },
    Hotels: { screen: Hotels }
}, StackNavigatorOptions);

const GuidesNavigator = StackNavigator({
    Guides: { screen: Guides },
    Guide: { screen: Guide }
}, StackNavigatorOptions);

export const TravelNavigator = TabNavigator({
    Guides: { screen: GuidesNavigator },
    Cities: { screen: CitiesNavigator }
}, TabNavigatorOptions(tabs));
