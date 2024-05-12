import { getPokemon } from '@/utils/Api';
import { useQuery } from '@tanstack/react-query';
import { Image, StyleSheet, Platform, ActivityIndicator, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { getColor, formatNumber } from '@/utils/Helper';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';


interface PokemonCardProps{
  name: string,  
}

export default function PokemonCard({ name }: PokemonCardProps ) {


  const { data, isLoading, error } = useQuery({ queryKey: ['pokemon', name], queryFn: async () => {
    const data = await getPokemon(name);
    // console.log('POKEMON', data);
    return data;
    }
  });

  if(isLoading){
    return <ActivityIndicator style={{ position: 'absolute', left: '50%', width:'100%', flex: 1, justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}/>
  }
  
  if (!data || error) return <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>Data not found.</Text>;

  return (
    <Link href={`/${data.name}`} asChild>
    <Pressable style={{ flex: 1, alignItems: 'center', borderRadius: 10, backgroundColor: '#0553' }}>
        <Image 
        source={{ uri: data.sprites.other['official-artwork'].front_default }}
        style={{ width: 120, height: 120, objectFit: 'cover', marginTop: 20 }}
        />
        <View style={{ width: '100%', paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginBottom: 5, marginTop: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#5b5b5b', marginBottom: 7 }}>{data.name.toUpperCase().charAt(0) + data.name.slice(1)}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white'}}>#{formatNumber(data.id)}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
          { data.types.map((item: any, index: number) => {
              return(
                  <View key={index} style={{ backgroundColor: getColor(item.type.name), paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>{item.type.name.toUpperCase().charAt(0) + item.type.name.slice(1)}</Text>
                  </View>
              );
            })
          }
          </View>
        </View> 
    </Pressable>
    </Link>
  )
}
