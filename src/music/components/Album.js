// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, TouchableWithoutFeedback} from "react-native";

import {StyleGuide, Image, Text} from "../../components";

import type {NavigationProps} from "../../components";
import type {Album} from "../api";

type AlbumProps = NavigationProps<> & {
    album: Album,
    from: "profile" | "library"
};

export default class AlbumComp extends React.Component<AlbumProps> {

    static defaultProps = {
        from: "library"
    }

    @autobind
    onPress() {
        const {navigation, album, from} = this.props;
        const key = from === "library" ? "Album" : "ProfileAlbum";
        const back = from === "library" ? "Library" : "Profile";
        navigation.navigate(key, { album, back });
    }

    render(): React.Node {
        const {onPress} = this;
        const {album} = this.props;
        return (
            <TouchableWithoutFeedback {...{onPress}}>
                <View style={styles.container}>
                    <Image style={styles.image} {...album.picture} />
                    <View style={styles.metadata}>
                        <Text type="headline">{album.name}</Text>
                        <Text tyle="footnote" numberOfLines={1}>{album.artist}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: StyleGuide.spacing.small,
        marginBottom: 1,
        ...StyleGuide.styles.borderRadius,
        ...StyleGuide.styles.shadow
    },
    image: {
        overflow: "hidden",
        height: 163,
        borderTopLeftRadius: StyleGuide.styles.borderRadius.borderRadius,
        borderTopRightRadius: StyleGuide.styles.borderRadius.borderRadius
    },
    metadata: {
        padding: StyleGuide.spacing.tiny
    }
});
