// @flow
import * as _ from "lodash";
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet} from "react-native";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";

import {ActionSheet, Image, StyleGuide} from "../../components";
import ExpandedPlayerControls from "./ExpandedPlayerControls";

import {type Playlist, type Track} from "../api";

type PlayerActionSheetProps = {
    playlist: Playlist
};

@observer
export default class PlayerActionSheet extends React.Component<PlayerActionSheetProps> {

    actionSheet: ActionSheet;

    @observable track: Track;

    @action
    componentDidMount() {
        const {playlist} = this.props;
        this.track = playlist.entries[0].track;
    }

    @autobind
    setActionSheet(actionSheet: ?ActionSheet) {
        if (actionSheet) {
            this.actionSheet = actionSheet;
        }
    }

    @action
    toggle(track: Track) {
        this.track = track;
        this.actionSheet.toggle();
    }

    @autobind @action
    switchTrack(track: Track) {
        this.track = track;
    }

    render(): React.Node {
        const {track, switchTrack, setActionSheet} = this;
        if (!track) {
            return null;
        }
        const {playlist} = this.props;
        const title = this.track ? this.track.name : "";
        const {album} = _.find(playlist.entries, entry => entry.track.uri === track.uri);
        const subtitle = `${album.artist} - ${album.name}`;
        return (
            <ActionSheet ref={setActionSheet} {...{title, subtitle}} noSafeArea>
                <Image style={styles.image} {...album.picture} />
                <ExpandedPlayerControls {...{playlist, track, switchTrack}} />
            </ActionSheet>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 311,
        width: 311,
        alignSelf: "center",
        margin: StyleGuide.spacing.small,
        ...StyleGuide.styles.borderRadius
    }
});
