// @flow
import * as React from "react";
import {View} from "react-native";

import {TabBar} from "../../components";
import PlayerControls from "./PlayerControls";

import type {TabBarProps} from "../../components/TabBar";

export default class MusicTabBar extends React.PureComponent<TabBarProps> {

    render(): React.Node {
        const {tabs, navigation} = this.props;
        return (
            <View>
                <PlayerControls />
                <TabBar {...{navigation, tabs}} />
            </View>
        );
    }
}
