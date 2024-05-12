import { useLocalSearchParams } from "expo-router"
import { View, Text, StyleSheet, ActivityIndicator, Image, Pressable, ScrollView } from "react-native"
import { Stack } from 'expo-router';
import { getPokemon } from "@/utils/Api";
import { useQuery } from "@tanstack/react-query";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";


export default function PokemonDetails() {
    const[showFavourite, setShowFavourite] = useState(false);
    const[listFavorite, setListFavorite]  = useState([]);
    
    const { pokemonName } = useLocalSearchParams();
    // const pokemonTitle =  `${pokemonName?.toString().toUpperCase().charAt(0)}${pokemonName?.toString().slice(1)}`;
    // const param = pokemonName?.toString();

    // console.log('PARAM', pokemonName);

    const { data, isLoading, error } = useQuery({ 
        queryKey: ['pokemon', pokemonName], 
        queryFn: () => getPokemon(pokemonName) 
    });


    if(isLoading){
        return <ActivityIndicator />
    }

    if(error){
        return <Text>Failed to get Pokemon Details</Text>
    }

    const toggleVisibility = () => {
     setShowFavourite(!showFavourite)
    }

    const storeDataFavorite = async() => {

        const existingData = await AsyncStorage.getItem('favorite');
        
        // console.log('existingData', existingData);

        const existingParse = JSON.parse(existingData || '[]');
        
        let dataFavorite = [];
        
        if(existingData){
            if(Array.isArray(existingParse)){
                existingParse.forEach(obj => {
                    dataFavorite.push(obj);
                })
            }else{
                dataFavorite.push(existingParse);
            }
        }
        
        const pokemon = {"name": data.name, "image": data.sprites.other['official-artwork'].front_default};
        dataFavorite.push(pokemon);

        // console.log('dataFavorite', dataFavorite);

        const pokemonstring = JSON.stringify(dataFavorite);

        // setItem data
        await AsyncStorage.setItem('favorite', pokemonstring);

        // getItem data
        const pokemonGet = await AsyncStorage.getItem('favorite');

        // ready data for loop
        const pokemonFavorite = JSON.parse(pokemonGet || '[]');

        // await AsyncStorage.clear();
        
        // console.log('pokemonString', pokemonFavorite);
    }


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
    }, []);   

    return(
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: true, title: 'Pokemon Detail', headerTitleAlign: 'center' }} />
            <ScrollView>
                <View style={styles.headerContent}>
                    <Image 
                        source={{ uri: data.sprites.other['official-artwork'].front_default }}
                        style={{ width: 150, height: 150, objectFit: 'cover', marginTop: 10, marginBottom: 10 }}
                    />
                </View>
                <View style={styles.bodyContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: '800', color: '#5b5b5b' }}>{data.name.toUpperCase().charAt(0) + data.name.slice(1)}</Text>
                        {
                            listFavorite.map((item: any, index: number) => {
                                return(
                                    !showFavourite && (item.name !== data.name)?
                                    <Pressable key={index} style={{ position: 'absolute', right: 0, marginRight: 12, marginTop: 10 }} onPress={() => {toggleVisibility(); storeDataFavorite()}} >
                                        <AntDesign name="hearto" size={20} color="black" />
                                    </Pressable>
                                    :
                                    <Pressable key={index} style={{ position: 'absolute', right: 0, marginRight: 12, marginTop: 10 }}>
                                        <AntDesign name="heart" size={24} color="black" />
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 20, color: '#38761d', fontWeight: '800'}}>Sprite Gallery</Text>
                        <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row', gap: 15, flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Image source={{ uri: data.sprites.front_default}} style={{ width: 160, height: 140, objectFit: 'cover', borderWidth: 1, borderColor: 'gray', borderRadius: 8 }}/>       
                            <Image source={{ uri: data.sprites.back_default}} style={{ width: 160, height: 140, objectFit: 'cover', borderWidth: 1, borderColor: 'gray', borderRadius: 8 }}/>       
                            <Image source={{ uri: data.sprites.front_shiny}} style={{ width: 160, height: 140, objectFit: 'cover', borderWidth: 1, borderColor: 'gray', borderRadius: 8 }}/>       
                            <Image source={{ uri: data.sprites.back_shiny}} style={{ width: 160, height: 140, objectFit: 'cover', borderWidth: 1, borderColor: 'gray', borderRadius: 8 }}/>       
                        </View>
                    </View>
                    <View style={{ marginBottom: 40 }}>
                        <Text style={{ fontSize: 20, color: '#38761d', fontWeight: '800'}}>Abilities</Text>
                        <View style={{ marginTop: 10, flexDirection: 'column', gap: 10, marginLeft: 10 }}>
                            {
                                data.abilities.map((item: any, index: number) => {
                                    return(
                                        <Text key={index}  style={{ fontSize: 14 }}>{item.ability.name.toUpperCase().charAt(0) + item.ability.name.slice(1)}</Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: '#93c47d'
    },
    headerContent: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    bodyContent: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 25,
        backgroundColor: 'white',
        
    }
})