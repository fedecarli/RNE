// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet} from "react-native";

import {Card, Feed, NavigationHelpers} from "../components";

import TravelAPI, {type Guide} from "./api";

import type {NavigationProps} from "../components";

type Chunk = {
    id: string,
    guides: Guide[]
};

export default class Guides extends React.Component<NavigationProps<>> {

    @autobind
    renderItem(chunk: Chunk): React.Node {
        const {navigation} = this.props;
        return (
            <View style={styles.row}>
                {
                    chunk.guides.map(guide => (
                        <Card
                            key={guide.id}
                            title={guide.city}
                            subtitle={guide.country}
                            description={`${guide.duration} days`}
                            onPress={() => navigation.navigate("Guide", { guide })}
                            picture={guide.picture}
                            height={chunk.guides.length === 1 ? 300 : 175}
                        />
                    ))
                }
            </View>
        );
    }

    @autobind
    onPress() {
        const {navigation} = this.props;
        NavigationHelpers.logout(navigation);
    }

    render(): React.Node {
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
        const data = windowing(TravelAPI.guides).map(guides => (
            { id: guides.map(guide => guide.id).join(""), guides }
        ));
        const title = "Guides";
        const rightAction = {
            icon: "log-out",
            onPress
        };
        return (
            <Feed {...{data, renderItem, title, navigation, rightAction}} />
        );
    }
}

const windowing = (guides: Guide[]): Guide[][] => {
    const windows = [[]];
    guides.forEach(guide => {
        if (windows[windows.length - 1].length === 2) {
            windows.push([guide]);
            windows.push([]);
        } else {
            windows[windows.length - 1].push(guide);
        }
    });
    return windows;
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    }
});
