// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";

import {Text, StyleGuide, Icon} from "../../components";

import type {Ingredient} from "../api";

type IngredientProps = {
    ingredient: Ingredient
};

type IngredientState = {
    checked: boolean
};

export default class IngredientComp extends React.Component<IngredientProps, IngredientState> {

    state = {
        checked: false
    };

    static getDerivedStateFromProps({ ingredient }: IngredientProps): IngredientState {
        const {checked} = ingredient;
        return { checked };
    }

    @autobind
    toggle() {
        const {checked} = this.state;
        this.setState({ checked: !checked });
    }

    render(): React.Node {
        const {ingredient} = this.props;
        const {checked} = this.state;
        return (
            <View>
                <TouchableOpacity onPress={this.toggle}>
                    <View style={[styles.content, checked ? styles.semiOpaque : styles.opaque]}>
                        <View style={styles.radio}>
                            <Icon name={checked ? "check-circle" : "circle"} primary />
                        </View>
                        <View style={styles.text}>
                            <Text>{ingredient.name}</Text>
                            <Text style={styles.subhead} type="subhead">{ingredient.quantity}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.separator} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        ...StyleGuide.styles.separator
    },
    content: {
        flexDirection: "row"
    },
    subhead: {
        color: StyleGuide.palette.darkGray
    },
    radio: {
        paddingHorizontal: StyleGuide.spacing.small,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        padding: StyleGuide.spacing.tiny
    },
    semiOpaque: {
        opacity: 0.5
    },
    opaque: {
        opacity: 1
    }
});
