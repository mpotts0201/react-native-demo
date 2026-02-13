import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
  NavigationContainer
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import bell from '../assets/bell.png';
import star from '../assets/star.png';
import Landing from './screens/Landing';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import TabIcon from '../components/3DModels/TabIcon';
import StarModel from '../components/3DModels/SpinningIcon';

export enum routes { LANDING = "LANDING", UI_LIB = "UI_LIB" }

const HomeTabs = createBottomTabNavigator({
  screens: {
    Landing: {
      screen: Landing,
      options: {
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <TabIcon>
              <StarModel scale={4.0} />
          </TabIcon>
        ),
      },
    },
    Updates: {
      screen: Updates,
      options: {
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LANDING'>
        <Stack.Screen name={routes.LANDING} component={Landing} />
        <Stack.Screen name={routes.UI_LIB} component={Updates} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default AppNavigator;
