// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet} from "react-native";

import {Feed, NavigationHelpers, StyleGuide, type NavigationProps} from "../components";

import MusicAPI, {type Album as AlbumModel} from "./api";
import {Album, withPlayer, type PlayerProps} from "./components";

class Library extends React.Component<PlayerProps & NavigationProps<>> {

    @autobind
    renderItem(album: AlbumModel): React.Node {
        const {navigation} = this.props;
        return <Album {...{album, navigation}} />;
    }

    @autobind
    async onPress(): Promise<void> {
        const {navigation, player} = this.props;
        if (player.sound) {
            await player.sound.unloadAsync();
        }
        NavigationHelpers.logout(navigation);
    }

    render(): React.Node {
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
        const data = MusicAPI.albums;
        const title = "Library";
        const rightAction = {
            icon: "log-out",
            onPress
        };
        return (
            <Feed {...{data, renderItem, title, navigation, rightAction}} style={styles.content} numColumns={2} />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: StyleGuide.spacing.small + 64
    }
});

export default withPlayer(Library);
