import 'react-native-gesture-handler';
// import { ThemeProvider } from '@shopify/restyle';
import { theme } from 'theme';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from 'navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { useState } from 'react';
import AuthNavigator from 'navigation/AuthNavigator';
import AuthContext from 'auth/AuthContext';
import { CartProvider } from 'context/CartContex';

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <CartProvider>
        {/* <ThemeProvider theme={theme}> */}
        <StatusBar barStyle={'dark-content'} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>{user ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>
        </GestureHandlerRootView>
        {/* </ThemeProvider> */}
      </CartProvider>
    </AuthContext.Provider>
  );
}
