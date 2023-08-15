import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import FitnessCards from '../Components/FitnessCards';
import {FitnessItems} from '../Context';

const HomeScreen = () => {
  const {
    minutes,

    calories,

    workout,
  } = useContext(FitnessItems);
  return (
    <ScrollView className="">
      <View className="bg-[#387e64] px-2 h-52 w-full ">
        <Text className="text-white font-bold text-2xl mt-3">HOME WORKOUT</Text>
        <View className="flex-row items-center justify-between mt-5 ">
          <View>
            <Text className="text-center font-bold text-white text-xl">
              {workout}
            </Text>
            <Text className="text-[#D0D0D0] text-sm mt-1">WORKOUTS</Text>
          </View>
          <View>
            <Text className="text-center font-bold text-white text-xl">
              {calories}
            </Text>
            <Text className="text-[#D0D0D0] text-sm mt-1">KCAL</Text>
          </View>
          <View>
            <Text className="text-center font-bold text-white text-xl">
              {minutes}
            </Text>
            <Text className="text-[#D0D0D0] text-sm mt-1">MINS</Text>
          </View>
        </View>
        <View className="justify-center items-center ">
          <Image
            className="w-[95%] h-32 mt-6 rounded-md"
            source={{
              uri: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png',
            }}
          />
        </View>
      </View>
      <FitnessCards />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
