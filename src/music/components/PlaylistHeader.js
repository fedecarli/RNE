// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View} from "react-native";
import {observer} from "mobx-react/native";

import {Button, StyleGuide, Text, Image} from "../../components";

import {withPlayer, type PlayerProps} from "./Player";
import PlaylistThumbnail from "./PlaylistThumbnail";

import {type Playlist} from "../api";

type AlbumHeaderProps = PlayerProps & {
    playlist: Playlist
};

@observer
class PlaylistHeader extends React.Component<AlbumHeaderProps> {

    @autobind
    toggle() {
        const {playlist, player} = this.props;
        const playlistEntry = playlist.entries[0];
        if (player.isSongPlaying(playlist, playlistEntry)) {
            player.toggle();
        } else {
            player.play(playlist, playlistEntry);
        }
    }

    @autobind
    shuffle() {
        const {playlist, player} = this.props;
        player.shuffle(playlist);
    }

    render(): React.Node {
        const {playlist, player} = this.props;
        const artists = playlist.isAlbum ?
            playlist.entries[0].album.name :
            playlist.entries.map(entry => entry.album.artist).join(", ");
        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    {
                        playlist.isAlbum && (
                            <Image {...playlist.entries[0].album.picture} style={styles.image} />
                        )
                    }
                    {
                        !playlist.isAlbum && (
                            <PlaylistThumbnail size={80} style={styles.cover} {...{playlist}} />
                        )
                    }
                    <View style={styles.metadata}>
                        <Text type="headline" numberOfLines={1}>{playlist.name}</Text>
                        <Text type="footnote" numberOfLines={1}>{artists}</Text>
                    </View>
                </View>
                <View style={styles.controls}>
                    <View style={styles.leftControl}>
                        <Button
                            icon="play"
                            onPress={this.toggle}
                            disabled={player.locked}
                            secondary
                        />
                    </View>
                    <View style={styles.rightControl}>
                        <Button icon="shuffle" secondary onPress={this.shuffle} disabled={player.locked} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...StyleGuide.styles.shadow,
        zIndex: 1000
    },
    header: {
        flexDirection: "row",
        padding: StyleGuide.spacing.small
    },
    image: {
        width: 80,
        height: 80,
        marginRight: StyleGuide.spacing.small
    },
    cover: {
        marginRight: StyleGuide.spacing.small
    },
    metadata: {
        flex: 1
    },
    controls: {
        flexDirection: "row",
        paddingHorizontal: StyleGuide.spacing.small
    },
    leftControl: {
        flex: 1,
        marginRight: StyleGuide.spacing.tiny
    },
    rightControl: {
        flex: 1,
        marginLeft: StyleGuide.spacing.tiny
    }
});

export default withPlayer(PlaylistHeader);
