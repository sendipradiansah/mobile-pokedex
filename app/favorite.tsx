import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard";


export default function Favorite() {

    const[listFavorite, setListFavorite]  = useState([]);

    const getDataFavorite = async () => {

      try{
        // getItem data
        const pokemonGet = await AsyncStorage.getItem('favorite');

        // ready data for loop
        const pokemonFavorite = JSON.parse(pokemonGet || '[]');

        // console.log(pokemonFavorite);
        setListFavorite(pokemonFavorite);
      } catch(e){
        console.log(e);
      }

      };

    useEffect(() => {

      getDataFavorite();
    }, [])

    // console.log('DATA POKEMON', listFavorite);

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: 'Favorite Pokemon', headerTitleAlign: 'center' }} />
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          {
            listFavorite.length > 0 ? 
            listFavorite.map((item: any, index: number) => {
              return(
                <View key={index} style={{ flexDirection: 'row', width: '48.5%'}}>
                  <PokemonCard name={item.name} />
                </View>
                )
              })
              :
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>There is no list of favorite pokemon.</Text>
            }
            </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10
  }
});
