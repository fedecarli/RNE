// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {SafeAreaView, ScrollView, StyleSheet, View, Image, StatusBar, Platform} from "react-native";

import {NavigationHelpers, Colors, StyleGuide, Images, Text, withTheme} from "../components";

import Kit from "./Kit";

import type {ThemeProps, ThemeName} from "../components/theme";
import type {NavigationProps} from "../components/Navigation";

const images = require("./images");

class Welcome extends React.Component<ThemeProps & NavigationProps<>> {

    componentDidMount() {
        StatusBar.setBarStyle("dark-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("white");
        }
    }

    navigate(themeName: ThemeName) {
        const { navigation, theme } = this.props;
        StatusBar.setBarStyle("light-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor(Colors[themeName].primary);
        }
        theme.switchColors(Colors[themeName]);
        NavigationHelpers.reset(navigation, themeName);
    }

    @autobind
    food() {
        this.navigate("Food");
    }

    @autobind
    social() {
        this.navigate("Social");
    }

    @autobind
    music() {
        this.navigate("Music");
    }

    @autobind
    photography() {
        this.navigate("Photography");
    }

    @autobind
    travel() {
        this.navigate("Travel");
    }

    render(): React.Node {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeHeader}>
                    <View style={styles.header}>
                        <View>
                            <Text type="footnote">SKETCH ELEMENTS</Text>
                            <Text type="title1">Apps</Text>
                        </View>
                        <Image source={Images.logo} style={styles.logo} />
                    </View>
                </SafeAreaView>
                <ScrollView contentContainerStyle={styles.content}>
                    <Kit
                        uri={images.food.uri}
                        preview={images.food.preview}
                        title="Food"
                        backgroundColor={Colors.Food.primary}
                        onPress={this.food}
                    />
                    <Kit

                        uri={images.social.uri}
                        preview={images.social.preview}
                        title="Social"
                        backgroundColor={Colors.Social.primary}
                        onPress={this.social}
                    />
                    <Kit
                        uri={images.music.uri}
                        preview={images.music.preview}
                        title="Music"
                        backgroundColor={Colors.Music.primary}
                        onPress={this.music}
                    />
                    <Kit
                        uri={images.photography.uri}
                        preview={images.photography.preview}
                        title="Photography"
                        backgroundColor={Colors.Photography.primary}
                        onPress={this.photography}
                    />
                    <Kit
                        uri={images.travel.uri}
                        preview={images.travel.preview}
                        title="Travel"
                        backgroundColor={Colors.Travel.primary}
                        onPress={this.travel}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeHeader: {
        ...StyleGuide.styles.shadow
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.small
    },
    logo: {
        width: 50,
        height: 50
    },
    content: {
        paddingVertical: StyleGuide.spacing.small
    }
});

export default withTheme(Welcome);
