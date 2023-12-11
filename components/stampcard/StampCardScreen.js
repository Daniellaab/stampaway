// Her håndteres stempling af stempelkort og brugen af barcode-scanner.

import { BarCodeScanner } from 'expo-barcode-scanner';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

// Komponent til stempelkort
const StampCardScreen = ({ route }) => {
  // State-hooks til at håndtere antal stempler, scanning og virksomhedsinformation
  const [stamps, setStamps] = useState(0);
  const [scanned, setScanned] = useState(false);
  const [company, setCompany] = useState({});
  const [stampCardName, setStampCardName] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Effekt til at hente virksomhedsdata baseret på ruteparametre
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (route.params && route.params.companyId) {
        const id = route.params.companyId;
        const db = getDatabase();
        const companyRef = ref(db, `Companies/${id}`);

        const unsubscribe = onValue(companyRef, (snapshot) => {
          const companySnapshot = snapshot.val();
          if (companySnapshot && companySnapshot.stamps !== undefined) {
            setStamps(companySnapshot.stamps);
            setCompany(companySnapshot);
            setStampCardName(companySnapshot.stampCardName);
          }
        });

        return () => {
          // Oprensning: afmeld lytteren fra databasen
          unsubscribe();
        };
      }
    };

    fetchCompanyData();
  }, [route.params]);

  // Funktion til håndtering af stempel på kort
  const handleStampCard = async () => {
    try {
      if (route.params && route.params.companyId && stamps > 0) {
        const id = route.params.companyId;
        const db = getDatabase();
        const companyRef = ref(db, `Companies/${id}`);
  
        // Antager, at der findes en funktion til at opdatere antallet af stempler i din service
        await update(companyRef, { stamps: stamps - 1 });
        console.log('Stamping card successful');
  
        if (stamps === 1) {
          // Vis en belønningsmeddelelse, når der ikke er flere stempler tilbage
          Alert.alert('Tillykke!', 'Du har optjent en gratis belønning!');
        }
      } else {
        console.log('No stamps available to stamp');
      }
    } catch (error) {
      console.error('Error stamping card:', error);
    }
  };

  // Funktion til håndtering af scannede QR-koder
  const handleBarCodeScanned = () => {
    setScanned(true);
    // Yderligere logik ved scanning af en QR-kode, f.eks. vis en belønningsmeddelelse
  };

  // Funktion til at skifte tilstanden for QR-kode scanning
  const toggleScanner = () => {
    setIsScanning((prevIsScanning) => !prevIsScanning);
    setScanned(false);
  };

  return (
    // Visningslag med virksomhedsoplysninger, QR-kode og knapper til stempel og scanning
    <View style={styles.container}>
      <Text style={styles.header}>{company.name}</Text>
      <Text>{stampCardName}</Text>
      <Text>Antal stempler tilbage: {stamps}</Text>
      {/* QR-kode */}
      <View style={styles.qrCodeContainer}>
        <QRCode value={JSON.stringify(company)} size={200} />
      </View>
      {/* Stempelknap */}
      <View style={styles.centeredButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStampCard}>
          <Text style={styles.buttonText}>Stempl</Text>
        </TouchableOpacity>
      </View>
      {/* Skift scannerknap */}
      <Text>*Knappen forneden skal bruges af virksomhederne til at scanne brugernes QR-kode.</Text>
      <Button title={isScanning ? 'Stop scanning' : 'Start scanning'} onPress={toggleScanner} />
      {/* BarCodeScanner */}
      {isScanning && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
};

// Stilarter for StampCardScreen komponenten
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    width: '60%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  centeredButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Eksporter StampCardScreen komponenten som standard eksport
export default StampCardScreen;