// @flow
import * as React from "react";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import {View, StyleSheet} from "react-native";

import {Button} from "../../components";

type RadioGroupProps = {
    options: string[]
};

@observer
export default class RadioGroup extends React.Component<RadioGroupProps> {

    @observable selected: number = 0;
    @action select(index: number) { this.selected = index; }

    render(): React.Node {
        const {options} = this.props;
        return (
            <View style={styles.container}>
                {
                    options.map((label, key) => (
                        <Button
                            style={styles.button}
                            primary={this.selected === key}
                            secondary={this.selected !== key}
                            onPress={() => this.select(key)}
                            {...{label, key}}
                        />
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        shadowOpacity: 0
    }
});
