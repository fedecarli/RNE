// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {Card, Feed} from "../components";
import FoodAPI from "./api";

import type {Recipe} from "./api";
import type {NavigationProps} from "../components";

export default class CategoryComp extends React.Component<NavigationProps<{ categoryId: string }>> {

    @autobind
    renderItem(recipe: Recipe): React.Node {
        const {navigation} = this.props;
        const {categoryId} = navigation.state.params;
        const description = `${recipe.people} ${recipe.people > 1 ? "people" : "person"} · ${recipe.minutes} minutes`;
        return (
            <Card
                height={150}
                onPress={() => navigation.navigate("Recipe", { categoryId, recipeId: recipe.id })}
                {...{description}}
                {...recipe}
            />
        );
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const {categoryId} = navigation.state.params;
        const data = FoodAPI.recipes[categoryId];
        const {title} = FoodAPI.categories.filter(category => category.id === categoryId)[0];
        const back = "Recipes";
        return (
            <Feed {...{data, renderItem, title, navigation, back}} />
        );
    }
}
