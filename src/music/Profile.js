// @flow
import * as _ from "lodash";
import autobind from "autobind-decorator";
import * as React from "react";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import {StyleSheet, View} from "react-native";

import {
    NavigationHelpers, Container, Header, NavigationBar, Text, StyleGuide, SegmentedControl, Content, Avatar,
    type NavigationProps
} from "../components";

import MusicAPI from "./api";
import {Playlist, Album, withPlayer, type PlayerProps} from "./components";

@observer
class Profile extends React.Component<PlayerProps & NavigationProps<>> {

    @observable selectedIndex = 0;

    @autobind @action
    onChange(index: number) {
        this.selectedIndex = index;
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
        const {onPress, selectedIndex, onChange} = this;
        const {navigation} = this.props;
        const {me, playlists, albums} = MusicAPI;
        const from = "profile";
        return (
            <Container>
                <Header picture={me.cover} heightRatio={1}>
                    <NavigationBar type="transparent" rightAction={{ icon: "log-out", onPress }} {...{navigation}} />
                    <View style={styles.container}>
                        <Avatar uri={me.picture} size={90} style={styles.avatar} />
                        <Text color="white" type="title3" style={styles.text}>{me.name}</Text>
                        <Text color="white" type="callout" style={styles.text}>{me.caption}</Text>
                        <SegmentedControl
                            transparent
                            values={["Playlists", "Albums"]}
                            {...{selectedIndex, onChange}}
                        />
                    </View>
                </Header>
                <Content style={styles.content}>
                    {
                        selectedIndex === 0 &&
                            playlists.map(playlist => (
                                <Playlist key={playlist.id} {...{playlist, navigation, from}} />
                            ))
                    }
                    {
                        selectedIndex === 1 && _.chunk(albums, 2).map((row, index) => (
                            <View style={styles.row} key={index}>
                                {
                                    row.map(album => <Album key={album.id} {...{album, navigation, from}} />)
                                }
                            </View>
                        ))
                    }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: StyleGuide.spacing.small,
        flex: 1,
        justifyContent: "center"
    },
    avatar: {
        borderRadius: 45,
        borderWidth: 3,
        borderColor: StyleGuide.palette.white,
        marginVertical: StyleGuide.spacing.tiny
    },
    text: {
        textAlign: "center",
        marginBottom: StyleGuide.spacing.tiny
    },
    content: {
        paddingBottom: StyleGuide.spacing.small + 64
    },
    row: {
        flexDirection: "row",
        marginTop: StyleGuide.spacing.small,
        marginRight: StyleGuide.spacing.small
    }
});

export default withPlayer(Profile);
