// @flow
import * as _ from "lodash";
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {StyleGuide, Image, type StyleProps} from "../../components";

import {type Playlist} from "../api";

type PlaylistThumbnailProps = StyleProps & {
    playlist: Playlist,
    size: number
};

export default class PlaylistThumbnail extends React.PureComponent<PlaylistThumbnailProps> {

    render(): React.Node {
        const {playlist, size, style} = this.props;
        const entries = _.uniqBy(playlist.entries, entry => entry.album.id).slice(0, 4);
        return (
            <View style={[styles.container, { width: size, height: size }, style]}>
                {
                    entries.map((entry, index) => {
                        const coverStyle = [{ height: size / 2, width: size / 2 }];
                        switch (index) {
                        case 0:
                            coverStyle.push({
                                borderTopLeftRadius: radius
                            });
                            break;
                        case 1:
                            coverStyle.push({
                                borderTopRightRadius: radius
                            });
                            break;
                        case 2:
                            coverStyle.push({
                                borderBottomLeftRadius: radius
                            });
                            break;
                        default:
                            coverStyle.push({
                                borderBottomRightRadius: radius
                            });
                        }
                        return (
                            <Image
                                key={entry.album.id}
                                style={[styles.cover, coverStyle]}
                                {...entry.album.picture}
                            />
                        );
                    })
                }
            </View>
        );
    }
}

const radius = StyleGuide.styles.borderRadius.borderRadius;
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        ...StyleGuide.styles.borderRadius
    },
    cover: {
        overflow: "hidden"
    }
});
