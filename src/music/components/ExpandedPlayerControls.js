// @flow
import * as _ from "lodash";
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, Dimensions, Animated, Slider, ActivityIndicator} from "react-native";
import {observer} from "mobx-react/native";
import {observable, action} from "mobx";
import {LinearGradient} from "expo";
import {SafeAreaView} from "react-navigation";

import {IconButton, StyleGuide, type ThemeProps} from "../../components";

import type {Track, Playlist} from "../api";

import {withPlayerAndTheme, type PlayerProps} from "./Player";

type InjectedProps = ThemeProps & PlayerProps;
type ExpandedPlayerControlsProps = InjectedProps & {
    playlist: Playlist,
    track: Track,
    switchTrack: Track => mixed
};

@observer
class ExpandedPlayerControls extends React.Component<ExpandedPlayerControlsProps> {

    @observable repeat = false;
    @observable shuffleMode = false;

    @autobind @action
    toggleRepeat() {
        this.repeat = !this.repeat;
    }

    @autobind @action
    toggleShuffleMode() {
        this.shuffleMode = !this.shuffleMode;
    }

    @autobind
    async shuffle(): Promise<void> {
        const {playlist, player, switchTrack} = this.props;
        const entry = await player.shuffle(playlist);
        switchTrack(entry.track);
    }

    @autobind
    replay() {
        const {player, playlist, track} = this.props;
        const entry = _.find(playlist.entries, e => e.track.uri === track.uri);
        player.play(playlist, entry);
    }

    @autobind
    async play(): Promise<void> {
        const {player, playlist, track, switchTrack} = this.props;
        const entry = _.find(playlist.entries, e => e.track.uri === track.uri);
        await player.play(playlist, entry);
        switchTrack(track);
    }

    @autobind
    updateVolume(volume: number) {
        const {player} = this.props;
        player.sound.setVolumeAsync(volume);
    }

    render(): React.Node {
        const {playlist, track, player, theme} = this.props;
        const entry = _.find(playlist.entries, e => e.track.uri === track.uri);
        const isSongPlaying = player.isSongPlaying(playlist, entry);
        const translateX = isSongPlaying ? player.progress.interpolate({
            inputRange: [0, width],
            outputRange: [-width, 0]
        }) : -width;
        return (
            <View>
                <AnimatedLinearGradient
                    colors={["white", theme.palette.secondary]}
                    style={[styles.progress, { transform: [{ translateX }]}]}
                />
                <SafeAreaView>
                    <View style={styles.buttons}>
                        <IconButton
                            name="repeat"
                            disabled={!isSongPlaying}
                            onPress={this.toggleRepeat}
                            secondary={!this.repeat}
                            primary={this.repeat}
                        />
                        <IconButton
                            name="fast-forward"
                            disabled={!isSongPlaying || !player.isLoaded}
                            onPress={this.replay}
                            style={styles.flip}
                            primary
                        />
                        {
                            (player.isLoaded || player.track === undefined) && (
                                <IconButton
                                    name={(isSongPlaying && player.isPlaying) ? "pause" : "play"}
                                    onPress={isSongPlaying ? player.toggle : this.play}
                                    primary
                                />
                            )
                        }
                        {
                            (!player.isLoaded && player.track !== undefined) && (
                                <ActivityIndicator color={theme.palette.primary} />
                            )
                        }
                        <IconButton
                            name="fast-forward"
                            disabled={!isSongPlaying || !player.isLoaded}
                            onPress={this.shuffle}
                            primary
                        />
                        <IconButton
                            name="shuffle"
                            disabled={!isSongPlaying}
                            onPress={this.toggleShuffleMode}
                            secondary={!this.shuffleMode}
                            primary={this.shuffleMode}
                        />
                    </View>
                    <Slider
                        value={1}
                        minimumValue={0}
                        maximumValue={1}
                        onValueChange={this.updateVolume}
                        minimumTrackTintColor={theme.palette.primary}
                        maximumTrackTintColor={theme.palette.secondary}
                        disabled={!player.sound}
                        style={styles.slider}
                        thumbTintColor={theme.palette.primary}
                    />
                    <Animated.View
                        style={[
                            styles.progressBar, { borderColor: theme.palette.primary, transform: [{ translateX }] }
                        ]}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

const {width} = Dimensions.get("window");
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const styles = StyleSheet.create({
    progress: {
        ...StyleSheet.absoluteFillObject
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: StyleGuide.spacing.base,
        marginHorizontal: StyleGuide.spacing.small
    },
    slider: {
        marginVertical: StyleGuide.spacing.base,
        marginHorizontal: StyleGuide.spacing.small
    },
    flip: {
        transform: [{ rotate: "180deg" }]
    },
    progressBar: {
        borderBottomWidth: 2,
        width
    }
});


export default withPlayerAndTheme(ExpandedPlayerControls);
