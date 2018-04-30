// @flow
import * as React from "react";

import {GeoFeed, Activity, notImplementedYet, type NavigationProps} from "../components";
import {type City, type Restaurant} from "./api";

export default class Restaurants extends React.PureComponent<NavigationProps<{ city: City }>> {

    render(): React.Node {
        const {navigation} = this.props;
        const {city} = navigation.state.params;
        const markers = city.restaurants;
        return (
            <GeoFeed
                title="Restaurants"
                defaultCoordinates={city.location}
                back={city.city}
                {...{markers, navigation, renderItem}}
            />
        );
    }
}

const renderItem = (restaurant: Restaurant): React.Node => <Activity {...restaurant} onPress={notImplementedYet} />;
