import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import AppNavigator from './navigation';
import BottomNavBar from './components/navBar/BottomNavBar';
import FullScreen from './components/3DModels/FullScreen';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <AppNavigator />
        <BottomNavBar />
        <FullScreen />
      </Provider>
    </View>
  );
}
