// Her kan man finde funktionaliteten til at indlæse alle virksomheder i databasen.

import { getDatabase, off, onValue, ref } from "firebase/database";
import * as React from 'react';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Komponent til at vise en liste over virksomheder
function CompanyList({ navigation }) {
    // State til at gemme virksomhedsdata
    const [companies, setCompanies] = useState();

    // Effekt til at hente virksomhedsdata fra Firebase-databasen
    useEffect(() => {
        const db = getDatabase();
        const companyRef = ref(db, "Companies");
    
        // Brug 'onValue'-funktionen til at lytte efter ændringer i 'Companies'-noden
        onValue(companyRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Hvis der er data, sæt det i 'companies'-state
                setCompanies(data);
            }
        });
    
        // Ryd op i lytteren, når komponenten afmonteres
        return () => {
            // Afbryd lytteren
            off(companyRef);
        };
    }, []); // Det tomme afhængighedsarray betyder, at denne effekt kun kører én gang

    // Vi viser en tekst, hvis der ikke er data tilgængelig
    if (!companies) {
        return <Text>Loading...</Text>;
    }

    // Funktion til håndtering af valg af virksomhed
    const handleSelectCompany = id => {
        /*Her søger vi direkte i vores array af virksomheder og finder virksomhed-objektet som matcher idet vi har tilsendt*/
        const company = Object.entries(companies).find(company => company[0] === id /*id*/);
        navigation.navigate('CompanyDetails', { company });
    };

    // FlatList forventer et array. Derfor tager vi alle værdier fra vores 'companies'-objekt og bruger dem som array til listen
    const companyArray = Object.values(companies);
    const companyKeys = Object.keys(companies);

    return (
        <FlatList
            data={companyArray}
            // Vi bruger 'companyKeys' til at finde ID på den aktuelle virksomhed og returnerer dette som nøgle, og giver det med som ID til CompanyListItem
            keyExtractor={(item, index) => companyKeys[index]}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectCompany(companyKeys[index])}>
                        <Text>
                            {item.name} {item.description}
                        </Text>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

// Stilarter for komponenten
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 20,
        borderRadius: 10,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    companyDescription: {
        fontSize: 16,
    },
});

// Eksporter CompanyList komponenten som standard eksport
export default CompanyList;