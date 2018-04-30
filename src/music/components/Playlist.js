// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {Dimensions} from "react-native";

import {StyleGuide, Card, type NavigationProps} from "../../components";

import {type Playlist} from "../api";

import PlaylistThumbnail from "./PlaylistThumbnail";

type PlaylistProps = NavigationProps<> & {
    playlist: Playlist,
    from: "profile" | "discovery"
};

export default class PlaylistComp extends React.Component<PlaylistProps> {

    static defaultProps = {
        from: "discovery"
    };

    @autobind
    playlist() {
        const {playlist, navigation, from} = this.props;
        const key = from === "discovery" ? "Playlist" : "ProfilePlaylist";
        const back = from === "discovery" ? "Discovery" : "Profile";
        navigation.navigate(key, { playlist, back });
    }

    render(): React.Node {
        const {playlist} = this.props;
        const artists = playlist.entries.map(entry => entry.album.artist).join(", ");
        return (
            <Card title={playlist.name} description={artists} onPress={this.playlist}>
                <PlaylistThumbnail {...{playlist, size}} />
            </Card>
        );
    }
}

const size = Dimensions.get("window").width - (StyleGuide.spacing.small * 2);
