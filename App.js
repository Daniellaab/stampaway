// Importerer nødvendige komponenter og funktioner fra React og React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getApps, initializeApp } from "firebase/app";

// Importerer de forskellige skærme fra separate filer
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import MapScreen from './components/MapScreen';

import AddCompanyScreen from './components/companies/AddCompanyScreen';
import AllCompaniesScreen from './components/companies/AllCompaniesScreen';
import CompanyDetailsScreen from './components/companies/CompanyDetailsScreen';

import CreateCouponScreen from './components/coupons/CreateCouponScreen';
import CouponsScreen from './components/coupons/CouponsScreen';

// Opretter en staknavigator til at håndtere navigationen mellem skærmene
const Stack = createNativeStackNavigator();

// Hovedfunktionen, der definerer den samlede app-komponent
function App() {
// Firebase konfigurationsobjekt, der indeholder API-nøgler og andre opsætningsoplysninger
  const firebaseConfig = {
    apiKey: "AIzaSyANhYOvCJRE8Ue8cdf6Ib3Z5EGQLvElUVw",
    authDomain: "stampaway-64e61.firebaseapp.com",
    databaseURL: "https://stampaway-64e61-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "stampaway-64e61",
    storageBucket: "stampaway-64e61.appspot.com",
    messagingSenderId: "1011228104584",
    appId: "1:1011228104584:web:bbe3892fdbf3b59a324c3d"
  };
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log('Firebase On!'); // Udskriver besked i konsollen, når Firebase er aktiveret
  }
  // Returafsnittet, der indeholder navigationscontaineren og staknavigator med alle skærme
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddCompany" component={AddCompanyScreen} />
        <Stack.Screen name="AllCompanies" component={AllCompaniesScreen} />
        <Stack.Screen name="CompanyDetails" component={CompanyDetailsScreen} />
        <Stack.Screen name="CreateCoupon" component={CreateCouponScreen} />
        <Stack.Screen name="Coupons" component={CouponsScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name='Map' component={MapScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// Eksporterer App-komponenten som standard eksport for at gøre den tilgængelig for resten af applikationen
export default App;