import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import fitness from '../Data/fitness';
import {useNavigation} from '@react-navigation/native';

const FitnessCards = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();
  return (
    <View className="mt-16">
      {FitnessData.map((item, key) => (
        <Pressable
          onPress={() =>
            navigation.navigate('Workout', {
              image: item.image,
              excersises: item.excersises,
              id: item.id,
            })
          }
          className="items-center justify-center m-2"
          key={key}>
          <Image
            className="w-[95%] h-36 rounded-lg"
            source={{uri: item.image}}
          />
          <Text className="absolute text-white text-xl font-bold left-5 top-5">
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});
