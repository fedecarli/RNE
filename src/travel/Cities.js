// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {Card, Feed} from "../components";
import TravelAPI from "./api";

import type {City} from "./api";
import type {NavigationProps} from "../components";

export default class Cities extends React.Component<NavigationProps<>> {

    @autobind
    renderItem(city: City): React.Node {
        const {navigation} = this.props;
        return (
            <Card
                height={180}
                onPress={() => navigation.navigate("City", { city })}
                title={city.city}
                subtitle={city.country}
                picture={city.picture}
            />
        );
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const data = TravelAPI.cities;
        const title = "Cities";
        return (
            <Feed {...{data, renderItem, title, navigation}} />
        );
    }
}
