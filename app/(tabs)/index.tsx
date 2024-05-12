import { Image, StyleSheet, Platform, ActivityIndicator, View, Text, TouchableOpacity, Pressable, TextInput } from 'react-native';

import { getAllPokemon } from '@/utils/Api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import PokemonCard from '@/components/PokemonCard';
import { useState } from 'react';

export default function HomeScreen() {

  // const[listPokemon, setListPokemon] = useState([])
  const[searchText, setSearchText] = useState('');

  const {data: pokemon, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({ 
    queryKey: ['pokemon'], 
    queryFn: ({ pageParam }) => getAllPokemon(pageParam),
    initialPageParam: 1,  
    getNextPageParam: (lastPage, pages) =>  pages.length + 1,
  });

  // console.log(pokemon);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleSearch = () => {
    return( <View style={{ flexDirection: 'row', width: '50%' }}><PokemonCard name={searchText}/></View> )
  }

  return (
    <View style={styles.container}>
      <TextInput 
      onChangeText={(input) => {setSearchText(input); handleSearch()}}
      value={searchText}
        placeholder='Search by name...'
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 20, borderRadius: 8 }}
      />
      {
        searchText === '' ?
        <GestureHandlerRootView>
          <FlatList
            data={pokemon?.pages.flatMap((page) => page.results)}
            keyExtractor={item => item.name}
            numColumns={2}
            contentContainerStyle={{ gap: 10 }}
            columnWrapperStyle={{ gap: 10 }}
            renderItem={({ item }) => <PokemonCard name={item.name} />}
            onEndReached={loadMore}
            ListFooterComponent={() =>
              isFetchingNextPage ? <Text style={{textAlign: 'center'}}>Loading more...</Text> : null
            }
          >
          </FlatList>
        </GestureHandlerRootView>
        :
        handleSearch()
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    padding: 10,

  }
});
