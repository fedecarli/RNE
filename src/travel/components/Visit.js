// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, StyleGuide, withTheme, type ThemeProps, type StyleProps} from "../../components";

import {type Visit} from "../api";

type VisitProps = StyleProps & ThemeProps & {
    visit: Visit,
    first: boolean,
    last: boolean
};

class VisitComp extends React.PureComponent<VisitProps> {

    render(): React.Node {
        const {style, visit, theme, first, last} = this.props;
        const lineStyle = [styles.line];
        if (first) {
            lineStyle.push(styles.firstLine);
        } else if (last) {
            lineStyle.push(styles.lastLine);
        }
        return (
            <View style={[styles.container, style]}>
                <View style={styles.bullet}>
                    <View style={[lineStyle, { borderColor: theme.palette.primary }]} />
                    <View style={[styles.point, { borderColor: theme.palette.primary }]} />
                </View>
                <View style={styles.visit}>
                    <Text numberOfLines={1}>{visit.name}</Text>
                    <Text type="footnote" numberOfLines={1}>{visit.address}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: "row"
    },
    bullet: {
        width: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    point: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        backgroundColor: StyleGuide.palette.white
    },
    line: {
        position: "absolute",
        width: 23,
        borderRightWidth: 2,
        left: 0,
        top: 0,
        height: 60
    },
    firstLine: {
        top: 30,
        height: 30
    },
    lastLine: {
        top: 0,
        height: 30
    },
    visit: {
        justifyContent: "center"
    }
});

export default withTheme(VisitComp);
