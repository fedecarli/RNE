// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, IconButton, Image, StyleGuide} from "../../components";

import type {Track, PlaylistEntry} from "../api";

type TrackProps = {
    entry: PlaylistEntry,
    onPress: Track => mixed
};

export default class TrackComp extends React.PureComponent<TrackProps> {

    @autobind
    onPress() {
        const {onPress, entry} = this.props;
        onPress(entry.track);
    }

    render(): React.Node {
        const {onPress} = this;
        const {entry} = this.props;
        return (
            <View style={styles.container}>
                <Image style={styles.image} {...entry.album.picture} />
                <View style={styles.metadata}>
                    <Text numberOfLines={1}>{entry.track.name}</Text>
                    <Text type="footnote" numberOfLines={1}>{entry.album.artist}</Text>
                </View>
                <IconButton name="more-horizontal" onPress={onPress} primary />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: StyleGuide.spacing.tiny
    },
    image: {
        height: 36,
        width: 36,
        marginRight: StyleGuide.spacing.tiny,
        ...StyleGuide.styles.borderRadius
    },
    metadata: {
        flex: 1
    }
});
