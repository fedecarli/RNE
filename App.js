// @flow
import * as React from "react";
import {StatusBar, Platform} from "react-native";
import {useStrict, observable, action} from "mobx";
import {Provider, observer} from "mobx-react/native";
import {StackNavigator} from "react-navigation";
import {Font, AppLoading} from "expo";
import {Feather} from "@expo/vector-icons";
import ModalHost from "expo/src/modal/ModalHost";

import {Images, createTheme} from "./src/components";
import {StackNavigatorOptions} from "./src/components/Navigation";

import {Welcome} from "./src/welcome";
import {FoodNavigator} from "./src/food";
import {SocialNavigator} from "./src/social";
import {MusicNavigator} from "./src/music";
import {PhotographyNavigator} from "./src/photography";
import {TravelNavigator} from "./src/travel";
import {Player} from "./src/music/components";

const SFProTextBold = require("./fonts/SF-Pro-Text-Bold.otf");
const SFProTextSemibold = require("./fonts/SF-Pro-Text-Semibold.otf");
const SFProTextRegular = require("./fonts/SF-Pro-Text-Regular.otf");

useStrict(true);

const onNavigationStateChange = () => undefined;

@observer
export default class App extends React.Component<{}> {

    @observable isReady = false;
    @action ready() { this.isReady = true; }

    async componentDidMount(): Promise<void> {
        StatusBar.setBarStyle("dark-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("white");
        }
        const fonts = Font.loadAsync({
            "SFProText-Bold": SFProTextBold,
            "SFProText-Semibold": SFProTextSemibold,
            "SFProText-Regular": SFProTextRegular
        });
        const images = Images.downloadAsync();
        const icons = Font.loadAsync(Feather.font);
        await Promise.all([fonts, ...images, icons]);
        this.ready();
    }

    render(): React.Node {
        const {isReady} = this;
        if (!isReady) {
            return <AppLoading />;
        }
        return (
            <Provider theme={createTheme()} player={new Player()}>
                <ModalHost>
                    <MainNavigator {...{onNavigationStateChange}} />
                </ModalHost>
            </Provider>
        );
    }
}

const MainNavigator = StackNavigator({
    Welcome: { screen: Welcome },
    Food: { screen: FoodNavigator },
    Social: { screen: SocialNavigator },
    Music: { screen: MusicNavigator },
    Photography: { screen: PhotographyNavigator },
    Travel: { screen: TravelNavigator }
}, StackNavigatorOptions);
