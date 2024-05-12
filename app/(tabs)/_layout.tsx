import { Stack } from 'expo-router';
import React from 'react';

// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen  
        name="index"
        options={{
          title: 'Pokedex', 
          headerTitleAlign: 'center',
          headerRight: () => (
            <Link href={'/favorite'} asChild>
              <Pressable>
                  <AntDesign name="hearto" size={20} color="black"/>
              </Pressable>
            </Link>
          )
        }}
      />
    </Stack>
  );
}
