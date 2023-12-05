import * as React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useEffect, useState} from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

function CompanyList({navigation}){

    const [companies,setCompanies] = useState()
    useEffect(() => {
        const db = getDatabase();
        const companyRef = ref(db, "Companies");
    
        // Use the 'onValue' function to listen for changes in the 'Companies' node
        onValue(companyRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // If data exists, set it in the 'companies' state
                setCompanies(data);
            }
        });
    
        // Clean up the listener when the component unmounts
        return () => {
            // Unsubscribe the listener
            off(companyRef);
        };
    }, []); // The empty dependency array means this effect runs only once

    // Vi viser ingenting hvis der ikke er data
    if (!companies) {
        return <Text>Loading...</Text>;
    }

    const handleSelectCompany = id => {
        /*Her søger vi direkte i vores array af virksomheder og finder virksomhed-objektet som matcher idet vi har tilsendt*/
        const company = Object.entries(companies).find( company => company[0] === id /*id*/)
        navigation.navigate('CompanyDetails', { company });
    };
    
    // Flatlist forventer et array. Derfor tager vi alle values fra vores companies objekt, og bruger som array til listen
    const companyArray = Object.values(companies);
    const companyKeys = Object.keys(companies);

    return (
        <FlatList
            data={companyArray}
            // Vi bruger companyKeys til at finde ID på den aktuelle virksomhed og returnerer dette som key, og giver det med som ID til CompanyListItem
            keyExtractor={(item, index) => companyKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectCompany(companyKeys[index])}>
                        <Text>
                            {item.name} {item.description}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

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

export default CompanyList;