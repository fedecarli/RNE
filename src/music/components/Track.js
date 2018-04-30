// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, IconButton, StyleGuide} from "../../components";

import type {Track} from "../api";

type TrackProps = {
    index: number,
    track: Track,
    onPress: Track => mixed
};

export default class TrackComp extends React.PureComponent<TrackProps> {

    @autobind
    onPress() {
        const {track, onPress} = this.props;
        onPress(track);
    }

    render(): React.Node {
        const {onPress} = this;
        const {track, index} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.step}>{`${index}`}</Text>
                <Text style={styles.track}>{track.name}</Text>
                <IconButton name="more-horizontal" primary {...{onPress}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: StyleGuide.spacing.small
    },
    step: {
        marginRight: StyleGuide.spacing.small,
        color: StyleGuide.palette.darkGray
    },
    track: {
        marginRight: StyleGuide.spacing.small,
        flex: 1,
        flexWrap: "wrap"
    }
});
