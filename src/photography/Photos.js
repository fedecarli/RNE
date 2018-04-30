// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet} from "react-native";

import {Feed, StyleGuide, NavigationHelpers, type NavigationProps} from "../components";

import PhotograhyAPI, {type Photo} from "./api";
import {PhotoThumbnail} from "./components";

export default class Photos extends React.Component<NavigationProps<>> {

    @autobind
    renderItem(photo: Photo): React.Node {
        const {navigation} = this.props;
        return <PhotoThumbnail from="Photos" {...{photo, navigation}} />;
    }

    @autobind
    async onPress(): Promise<void> {
        const {navigation} = this.props;
        NavigationHelpers.logout(navigation);
    }

    render(): React.Node {
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
        const data = PhotograhyAPI.photos;
        const title = "Library";
        const rightAction = {
            icon: "log-out",
            onPress
        };
        return (
            <Feed
                style={styles.content}
                numColumns={3}
                {...{data, renderItem, title, navigation, rightAction}}
            />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
});
