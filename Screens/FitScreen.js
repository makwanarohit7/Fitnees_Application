import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FitnessItems} from '../Context';
import FastImage from 'react-native-fast-image';

const FitScreen = () => {
  const route = useRoute();
  // console.log(route.params);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];
  // console.log(current, "first excersise");
  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItems);
  console.log(completed, 'completed excersise');

  return (
    <SafeAreaView>
      <FastImage
        style={{width: '100%', height: 370}}
        source={{uri: current.image}}
      />

      <Text className="mx-auto mt-7 text-4xl font-bold text-gray-700">
        {current.name}
      </Text>

      <Text className="mx-auto mt-7 text-4xl font-bold text-gray-700">
        x{current.sets}
      </Text>
      {index + 1 >= excersise.length ? (
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}
          className="bg-blue-700 mx-auto mt-7 rounded-md p-2 w-[150]">
          <Text className="text-center font-bold text-xl text-white">DONE</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            navigation.navigate('Rest');
            setCompleted([...completed, current.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + 2.5);
            setCalories(calories + 6.3);
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          className="bg-blue-700 mx-auto mt-7 rounded-md p-2 w-[150]">
          <Text className="text-center font-bold text-xl text-white">DONE</Text>
        </Pressable>
      )}

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 50,
        }}>
        <Pressable
          disabled={index === 0}
          onPress={() => {
            navigation.navigate('Rest');

            setTimeout(() => {
              setIndex(index - 1);
            }, 2000);
          }}
          className="bg-green-700 p-2 rounded-xl mx-5 w-[100] ">
          <Text className="text-white font-bold text-center">PREV</Text>
        </Pressable>
        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate('Home');
            }}
            className="bg-green-700 p-2 rounded-xl mx-5 w-[100] ">
            <Text className="text-white font-bold text-center">SKIP</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate('Rest');
              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            className="bg-green-700 p-2 rounded-xl mx-5 w-[100] ">
            <Text className="text-white font-bold text-center">SKIP</Text>
          </Pressable>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default FitScreen;
