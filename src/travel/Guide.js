// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet} from "react-native";

import {
    ActionSheet, Container, DetailsBar, Header, NavigationBar, Button, Content, StyleGuide, DatePicker,
    QuantityInput, PayButton, type NavigationProps
} from "../components";
import {type Guide} from "./api";
import {Visit} from "./components";

export default class GuideScreen extends React.PureComponent<NavigationProps<{ guide: Guide }>> {

    reservation: ActionSheet;

    render(): React.Node {
        const {navigation} = this.props;
        const {guide} = navigation.state.params;
        return (
            <Container>
                <Header title={guide.city} picture={guide.picture}>
                    <NavigationBar type="transparent" back="Back" {...{navigation}} />
                </Header>
                <DetailsBar
                    details={[
                        { icon: "clock", caption: `${guide.duration} day${guide.duration > 1 ? "s" : ""}` },
                        { icon: "sun", caption: "Temperature" }
                    ]}
                />
                <Content style={styles.gutter}>
                    <Button primary label="Book Trip" onPress={this.toggleReservation} />
                    <View style={styles.list}>
                        {
                            guide.visits.map((visit, index) => (
                                <Visit
                                    style={styles.separator}
                                    key={index}
                                    first={index === 0}
                                    last={index === (guide.visits.length - 1)}
                                    {...{visit}}
                                />
                            ))
                        }
                    </View>
                </Content>
                <ActionSheet title="Reservation" ref={this.setReservationRef}>
                    {
                        guide.visits.map((visit, index) => (
                            <Visit
                                style={styles.separator}
                                key={index}
                                first={index === 0}
                                last={index === (guide.visits.length - 1)}
                                {...{visit}}
                            />
                        ))
                    }
                    <View style={styles.gutter}>
                        <DatePicker />
                        <QuantityInput singular="person" plural="people" from={1} to={6} />
                        <PayButton />
                    </View>
                </ActionSheet>
            </Container>
        );
    }

    @autobind
    toggleReservation() {
        this.reservation.toggle();
    }

    @autobind
    setReservationRef(reservation: ?ActionSheet) {
        if (reservation) {
            this.reservation = reservation;
        }
    }
}

const styles = StyleSheet.create({
    gutter: {
        padding: StyleGuide.spacing.small
    },
    list: {
        backgroundColor: StyleGuide.palette.white,
        ...StyleGuide.styles.borderRadius
    },
    separator: {
        ...StyleGuide.styles.separator
    }
});
