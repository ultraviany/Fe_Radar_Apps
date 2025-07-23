// Navigation/RootNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PageLogin from '../Login/PageLogin';
import PageSignUp from '../SignUp/PageSignUp';
import PageKonfrimOTP from '../KonfrimOTP/TempKonfrimOTP';
import PagePwOTP from '../ResetPw-OTP/PagePw-OTP';
import PageEpaper from '../E-Paper/PageEpaper';
import PageComment from '../Comment/PageComment';
import PageCRUD from '../CRUD/PageCRUD';
import PageCreate from '../CRUD/Create/PageCreate';
import PageRead from '../CRUD/Read/PageRead';
import PageUpdate from '../CRUD/Update/PageUpdate';
import PageDelete from '../CRUD/Delete/PageDelete';
import HomeUpdate from '../CRUD/Update/HomeUpdate';


const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={PageLogin} />
                <Stack.Screen name="SignUp" component={PageSignUp} />
                <Stack.Screen name="PageKonfrimOTP" component={PageKonfrimOTP} options={{ headerShown: false }} />
                <Stack.Screen name="PagePw-OTP" component={PagePwOTP} options={{ headerShown: false }} />
                <Stack.Screen name="PageEpaper" component={PageEpaper} />
                <Stack.Screen name="PageComment" component={PageComment} />
                <Stack.Screen name="PageCRUD" component={PageCRUD} />
                <Stack.Screen name="PageCreate" component={PageCreate} />
                <Stack.Screen name="PageRead" component={PageRead} />
                <Stack.Screen name="PageDelete" component={PageDelete} />
                <Stack.Screen name="HomeUpdate" component={HomeUpdate} options={{ headerShown: false }} />
                <Stack.Screen name="PageUpdate" component={PageUpdate} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
