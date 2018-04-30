// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet} from "react-native";

import {StyleGuide, Container, NavigationBar, Content, List, type NavigationProps} from "../components";

import {type Playlist, type Track} from "./api";
import {PlaylistEntry, PlaylistHeader, PlayerActionSheet} from "./components";

type PlaylistScreenParams = { playlist: Playlist, back: string };

export default class PlaylistScreen extends React.PureComponent<NavigationProps<PlaylistScreenParams>> {

    playerActionSheet: PlayerActionSheet;

    @autobind
    setPlayerActionSheet(playerActionSheet: ?PlayerActionSheet) {
        if (playerActionSheet) {
            this.playerActionSheet = playerActionSheet;
        }
    }

    @autobind
    toggle(track: Track) {
        this.playerActionSheet.toggle(track);
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {playlist, back} = navigation.state.params;
        return (
            <Container>
                <NavigationBar {...{navigation, back}} />
                <PlaylistHeader {...{playlist}} />
                <Content style={styles.gutter}>
                    <List
                        rows={playlist.entries}
                        renderRow={entry => <PlaylistEntry onPress={this.toggle} {...{entry}} />}
                    />
                </Content>
                <PlayerActionSheet ref={this.setPlayerActionSheet} {...{playlist}} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    gutter: {
        padding: StyleGuide.spacing.small,
        paddingBottom: StyleGuide.spacing.small + 64
    }
});
