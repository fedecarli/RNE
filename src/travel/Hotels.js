// @flow
import * as React from "react";

import {GeoFeed, Activity, Card, Ratings, notImplementedYet, type NavigationProps} from "../components";
import {type City, type Hotel} from "./api";

export default class Hotels extends React.PureComponent<NavigationProps<{ city: City }>> {

    render(): React.Node {
        const {navigation} = this.props;
        const {city} = navigation.state.params;
        const markers = city.hotels;
        return (
            <GeoFeed
                title="Hotels"
                defaultCoordinates={city.location}
                back={city.city}
                {...{markers, navigation, renderItem}}
            />
        );
    }
}

const renderItem = (hotel: Hotel): React.Node => {
    if (hotel.featured) {
        return (
            <Card
                key={hotel.id}
                title={hotel.title}
                subtitle={hotel.subtitle}
                onPress={notImplementedYet}
                picture={hotel.picture}
                description={<Ratings ratings={hotel.ratings} white />}
            />
        );
    }
    return <Activity {...hotel} onPress={notImplementedYet} />;
};
