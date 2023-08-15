import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FitnessItems} from '../Context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const WorkOutScreen = () => {
  const route = useRoute();
  //   console.log(route.params);
  const navigation = useNavigation();
  const {completed, setCompleted} = useContext(FitnessItems);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-white ">
        <Image
          className="w-[100%] h-[200]"
          source={{uri: route.params.image}}
        />
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', top: 20, left: 20}}
          name="arrow-back-outline"
          size={28}
          color="white"
        />

        {route.params.excersises.map((item, index) => (
          <Pressable
            style={{margin: 10, flexDirection: 'row', alignItems: 'center'}}
            key={index}>
            <Image style={{width: 90, height: 90}} source={{uri: item.image}} />
            <View style={{marginLeft: 10}}>
              <Text className="text-base font-bold text-gray-700 w-[170]">
                {item.name}
              </Text>
              <Text className="mt-1 text-xl text-gray-500">x{item.sets}</Text>
            </View>

            {completed.includes(item.name) ? (
              <AntDesign
                style={{marginLeft: 40}}
                name="checkcircle"
                size={24}
                color="green"
              />
            ) : null}
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={() => {
          navigation.navigate('Fit', {
            excersises: route.params.excersises,
          });
          setCompleted([]);
        }}
        className="bg-blue-700 p-2 mx-auto my-4 w-[130] rounded-lg">
        <Text className="text-center text-white text-xl font-bold">START</Text>
      </Pressable>
    </>
  );
};

export default WorkOutScreen;
