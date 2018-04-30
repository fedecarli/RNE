// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {Card, Feed, NavigationHelpers} from "../components";

import FoodAPI from "./api";
import type {Category} from "./api";

import type {NavigationProps} from "../components";

export default class Recipes extends React.Component<NavigationProps<>> {

    @autobind
    renderItem(category: Category): React.Node {
        const {navigation} = this.props;
        return <Card {...category} onPress={() => navigation.navigate("Category", { categoryId: category.id })} />;
    }

    @autobind
    onPress() {
        const {navigation} = this.props;
        NavigationHelpers.logout(navigation);
    }

    render(): React.Node {
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
        const data = FoodAPI.categories;
        const title = "Recipes";
        const rightAction = {
            icon: "log-out",
            onPress
        };
        return (
            <Feed {...{data, renderItem, title, navigation, rightAction}} />
        );
    }
}
