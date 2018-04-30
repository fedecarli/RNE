// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet, ActivityIndicator, Animated, Dimensions, TouchableWithoutFeedback} from "react-native";
import {observer} from "mobx-react/native";
import {LinearGradient} from "expo";

import {IconButton, Text, Image} from "../../components";
import {StyleGuide, type ThemeProps} from "../../components/theme";

import PlayerActionSheet from "./PlayerActionSheet";
import {withPlayerAndTheme, type PlayerProps} from "./Player";

type PlayerControlsProps = PlayerProps & ThemeProps;

@observer
class PlayerControls extends React.Component<PlayerControlsProps> {

    playerActionSheet: PlayerActionSheet;

    @autobind
    setPlayerActionSheet(playerActionSheet: ?PlayerActionSheet) {
        if (playerActionSheet) {
            this.playerActionSheet = playerActionSheet;
        }
    }

    @autobind
    toggle() {
        const {player} = this.props;
        if (player.playlistEntry) {
            this.playerActionSheet.toggle(player.playlistEntry.track);
        }
    }

    render(): React.Node {
        const {player, theme} = this.props;
        const translateY = player.sliding.interpolate({
            inputRange: [0, 64],
            outputRange: [-64, 64]
        });
        const translateX = player.progress.interpolate({
            inputRange: [0, width],
            outputRange: [-width, 0]
        });
        const borderColor = theme.palette.primary;
        return (
            <Animated.View style={[styles.container, { transform: [{ translateY }]}]}>
                <AnimatedLinearGradient
                    colors={["white", theme.palette.secondary]}
                    style={[styles.progress, { borderColor, transform: [{ translateX }]}]}
                />
                <TouchableWithoutFeedback onPress={this.toggle}>
                    <View style={styles.controls}>
                        {
                            !player.isLoaded && (
                                <ActivityIndicator color={theme.palette.primary} />
                            )
                        }
                        {
                            player.isLoaded && (
                                <View style={styles.item}>
                                    <IconButton
                                        name={player.isPlaying ? "pause" : "play"}
                                        color={theme.palette.primary}
                                        onPress={player.toggle}
                                    />
                                </View>
                            )
                        }
                        {
                            player.playlistEntry && (
                                <View style={styles.item}>
                                    <Text type="headline" primary>{player.playlistEntry.track.name}</Text>
                                    <Text type="footnote" primary>{player.playlistEntry.album.artist}</Text>
                                </View>
                            )
                        }
                        {
                            player.playlistEntry && (
                                <Image style={styles.cover} {...player.playlistEntry.album.picture} />
                            )
                        }
                    </View>
                </TouchableWithoutFeedback>
                {
                    player.playlist && (
                        <PlayerActionSheet ref={this.setPlayerActionSheet} playlist={player.playlist} />
                    )
                }
            </Animated.View>
        );
    }
}

const {width} = Dimensions.get("window");
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        backgroundColor: StyleGuide.palette.white,
        ...StyleGuide.styles.shadow
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.base,
        flex: 1
    },
    progress: {
        ...StyleSheet.absoluteFillObject,
        borderBottomWidth: 2
    },
    item: {
        alignItems: "center",
        justifyContent: "center",
        height: 64
    },
    cover: {
        height: 44,
        width: 44
    }
});

export default withPlayerAndTheme(PlayerControls);
