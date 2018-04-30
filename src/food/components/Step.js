// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, StyleGuide} from "../../components";

type StepProps = {
    index: number,
    step: string
};

export default class Step extends React.PureComponent<StepProps> {

    render(): React.Node {
        const {step, index} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.step}>{`${index}`}</Text>
                <Text style={styles.text}>{step}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: StyleGuide.spacing.small
    },
    step: {
        marginRight: StyleGuide.spacing.small,
        color: StyleGuide.palette.darkGray
    },
    text: {
        marginRight: StyleGuide.spacing.small
    }
});
