import {Picker} from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import Sound from 'react-native-sound';
import meditationImage from '../assets/8486358_3893379.jpg';

const Meditation = () => {
  const [seconds, setSeconds] = useState(600); // 10 minutes in seconds
  const [customTime, setCustomTime] = useState('10:00');
  const [timerActive, setTimerActive] = useState(false);
  const [sound, setSound] = useState(null);
  const [selectedSound, setSelectedSound] = useState('meditation.mp3'); // Default sound

  useEffect(() => {
    Sound.setCategory('Playback');
    const timerSound = new Sound('meditation.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound: ', error);
        return;
      }
      setSound(timerSound);
    });

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  useEffect(() => {
    if (timerActive && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (seconds === 0) {
      setTimerActive(false);
      if (sound) {
        sound.stop();
      }
    }
  }, [timerActive, seconds]);

  const startTimer = () => {
    if (sound) {
      sound.play();
    }
    setTimerActive(true);
  };

  const stopTimer = () => {
    if (sound) {
      sound.stop();
    }
    setTimerActive(false);
    setSeconds(600); // Reset timer to 10 minutes
  };

  const handleCustomTimeChange = value => {
    setCustomTime(value);
    const [minutes, seconds] = value.split(':');
    setSeconds(parseInt(minutes, 10) * 60 + parseInt(seconds, 10));
  };
  const handleSoundChange = value => {
    setSelectedSound(value);
    if (sound) {
      sound.stop();
      sound.release();
    }

    const newSound = new Sound(value, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound: ', error);
        return;
      }
      setSound(newSound);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={meditationImage} style={styles.meditationImage} />
      </View>
      <Picker
        style={styles.soundPicker}
        selectedValue={selectedSound}
        onValueChange={handleSoundChange}>
        <Picker.Item label="Meditation" value="meditation.mp3" />
        <Picker.Item label="Rain" value="rain.mp3" />
        <Picker.Item label="ocean waves" value="oceanwaves.mp3" />
        <Picker.Item label="River Water" value="riverwater.mp3" />
        <Picker.Item label="11hz-alpha waves" value="alphawaves.mp3" />
      </Picker>

      <Text style={styles.timerText}>{`${Math.floor(seconds / 60)}:${
        seconds % 60 < 10 ? '0' : ''
      }${seconds % 60}`}</Text>
      <TextInput
        style={styles.input}
        placeholder="Custom Timer (MM:SS)"
        value={customTime}
        onChangeText={handleCustomTimeChange}
      />
      <TouchableOpacity
        onPress={timerActive ? stopTimer : startTimer}
        style={styles.button}>
        <View style={styles.circle}>
          <Text style={styles.buttonText}>
            {timerActive ? 'Stop' : 'Start'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#387e64', // Light gray background
  },
  timerText: {
    fontSize: 48,
    marginBottom: 20,
    color: 'black', // Dark gray text color
    fontFamily: 'Arial', // Custom font family if needed
  },
  soundPicker: {
    width: 250,
    height: 40,
    marginBottom: 20,
    color: 'black',
    borderColor: '#999',
    borderWidth: 1,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#999', // Light gray border
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black', // Dark gray text color
  },
  imageContainer: {
    borderRadius: 150, // Half of image width and height for a circle
    marginBottom: 30,
    overflow: 'hidden', // Clip the image to the circle shape
  },
  meditationImage: {
    width: 300,
    height: 300,
    borderRadius: 150, // Half of image width and height for a circle
  },
  button: {
    alignItems: 'center',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60, // Half of circle width and height
    backgroundColor: '#2E86C1', // Dark blue button color
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Arial', // Custom font family if needed
  },
});

export default Meditation;
