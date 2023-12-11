# Beskrivelse
StampAway er et stempelkortsystem, hvor man som virksomhed kan oprette et stempelkort til brugerne. Brugerne vil have mulighed for at se en liste over de oprettede stempelkort og ved at klikke ind på det respektive stempelkort, så får brugeren en QR-kode som kan stemples. Denne løsning er tiltænkt til at være en tosidet platform, men for nu er der blevet udviklet kun kernefunktionaliteten så man vil kunne se funktionaliteter for både brugeren og virksomheden.

Kernefunktionaliteten: 
- at en virksomhed kan oprettes i databasen "Firebare" med et tilhørende stempelkort, hvor brugeren kan tilgå det oprettede stempelkort og få stemplet det. Stemplerne registreres i databasen og når man har fået alle sine stempler, så modtages der en besked med det.

# Applikationsstruktur
![Skærmbillede 2023-12-11 kl  18 00 05](https://github.com/Daniellaab/stampaway/assets/90241997/2426eb14-16b1-4c21-a66b-a5c1f71e0c4b)

# Dependencies
```
{
  "name": "stampaway",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.18.2",
    "@react-native-firebase/app": "^18.7.1",
    "@react-native-firebase/auth": "^18.7.1",
    "@react-native-firebase/firestore": "^18.7.1",
    "@react-native-picker/picker": "2.4.10",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "auth": "^0.0.1",
    "expo": "^49.0.21",
    "expo-barcode-scanner": "~12.5.3",
    "expo-camera": "~13.4.4",
    "expo-constants": "^14.4.2",
    "expo-image-picker": "~14.3.2",
    "expo-location": "~16.1.0",
    "expo-status-bar": "~1.6.0",
    "firebase": "^10.7.0",
    "firebase-admin": "^11.11.1",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "react-native-maps": "1.7.1",
    "react-native-paper": "^5.11.3",
    "react-native-qrcode-svg": "^6.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
```

# Opstart af koden
Til testning af koden:
1. Download koden
2. Åben mappen med koden
3. Kør "npx expo start" i terminalen

# Demovideo af applikationen
https://vimeo.com/893404363?share=copy 

# Screenshots af applikationen
![Simulator Screen Shot - iPhone 8 - 2023-12-11 at 18 18 13](https://github.com/Daniellaab/stampaway/assets/90241997/09d304d9-e86e-46b0-9e91-719d9cb88f94)
![Simulator Screen Shot - iPhone 8 - 2023-12-11 at 18 18 20](https://github.com/Daniellaab/stampaway/assets/90241997/918f8d75-574a-4332-a158-08201b311462)
![Simulator Screen Shot - iPhone 8 - 2023-12-11 at 18 22 07](https://github.com/Daniellaab/stampaway/assets/90241997/c14cec1f-3509-437c-872e-3992737dd01b)
![Simulator Screen Shot - iPhone 8 - 2023-12-11 at 18 22 14](https://github.com/Daniellaab/stampaway/assets/90241997/c82b85cf-812f-40c3-aebc-66abcba491c1)
![Simulator Screen Shot - iPhone 8 - 2023-12-11 at 18 22 23](https://github.com/Daniellaab/stampaway/assets/90241997/479597c6-d5a7-4900-b443-5038cbcd7274)
![Simulator Screen Shot - iPhone 8 - 2023-12-11 at 18 22 52](https://github.com/Daniellaab/stampaway/assets/90241997/1d0c5d74-3aef-42c6-adb9-f726a6257a4b)

