import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';

const Helth = () => {
  const [totalWaterIntake, setTotalWaterIntake] = useState(0);
  const [dailyWaterGoal, setDailyWaterGoal] = useState(2000);
  const [waterHistory, setWaterHistory] = useState([]);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [reminderInterval, setReminderInterval] = useState(30); // Default reminder interval in minutes
  const [reminders, setReminders] = useState([]);
  const [nextReminder, setNextReminder] = useState(null);
  const [customGoal, setCustomGoal] = useState(''); // State for custom goal input

  const updateCustomGoal = () => {
    if (customGoal !== '') {
      setDailyWaterGoal(parseInt(customGoal));
      setCustomGoal('');
    }
  };
  useEffect(() => {
    updateDailyProgress();
    setNextReminder(calculateNextReminder());
  }, [totalWaterIntake, dailyWaterGoal, reminders]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextReminder(calculateNextReminder());
    }, 1000 * 60); // Update next reminder every minute

    return () => clearInterval(interval);
  }, [reminders]);

  const logWaterIntake = () => {
    const log = {timestamp: new Date(), amount: 250};
    setTotalWaterIntake(prevIntake => prevIntake + log.amount);
    setWaterHistory(prevHistory => [...prevHistory, log]);
  };

  const updateGoal = () => {
    if (dailyWaterGoal > 0) {
      setDailyWaterGoal(parseInt(dailyWaterGoal));
    }
  };

  const updateDailyProgress = () => {
    const progress = (totalWaterIntake / dailyWaterGoal) * 100;
    setDailyProgress(progress > 100 ? 100 : progress);
  };

  const calculateNextReminder = () => {
    if (reminders.length === 0) {
      return null;
    }
    const now = new Date();
    const sortedReminders = [...reminders].sort((a, b) => a - b);
    for (const reminder of sortedReminders) {
      if (reminder > now) {
        return reminder;
      }
    }
    return null;
  };

  const addReminder = () => {
    const now = new Date();
    const reminderTime = new Date(now.getTime() + reminderInterval * 60 * 1000);
    setReminders(prevReminders => [...prevReminders, reminderTime]);
  };
  const getRecommendation = () => {
    if (dailyProgress < 50) {
      return 'You need to drink more water!';
    } else if (dailyProgress >= 50 && dailyProgress < 100) {
      return 'You are halfway there!';
    } else {
      return 'Congratulations! You reached your daily goal!';
    }
  };

  const resetProgress = () => {
    setTotalWaterIntake(0);
    setWaterHistory([]);
    setDailyProgress(0);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Reminder</Text>
      <Text style={styles.totalIntake}>
        Total Water Intake: {totalWaterIntake} ml
      </Text>
      <TouchableOpacity onPress={logWaterIntake} style={styles.button}>
        <Text style={styles.buttonText}>Log Water Intake</Text>
      </TouchableOpacity>
      <Text style={styles.goalText}>Daily Water Goal: {dailyWaterGoal} ml</Text>
      <TextInput
        className="text-black "
        style={styles.input}
        keyboardType="numeric"
        placeholder="Set Custom Daily Goal (ml)"
        value={customGoal}
        onChangeText={text => setCustomGoal(text)}
      />
      <TouchableOpacity onPress={updateCustomGoal} style={styles.button}>
        <Text style={styles.buttonText}>Set Custom Goal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetProgress} style={styles.button}>
        <Text style={styles.buttonText}>Reset Progress</Text>
      </TouchableOpacity>
      {nextReminder && (
        <Text style={styles.nextReminder}>
          Next Reminder: {nextReminder.toLocaleTimeString()}
        </Text>
      )}
      <TouchableOpacity onPress={addReminder} style={styles.button}>
        <Text style={styles.buttonText}>Add Reminder</Text>
      </TouchableOpacity>
      <Text style={styles.recommendation}>{getRecommendation()}</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, {width: `${dailyProgress}%`}]} />
      </View>
      <Text style={styles.progressText}>
        Daily Progress: {dailyProgress.toFixed(2)}%
      </Text>
      <Text style={styles.historyTitle}>Water Intake History</Text>
      <FlatList
        data={waterHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.historyItem}>
            <Text className="text-black">
              {item.timestamp.toLocaleString()}
            </Text>
            <Text className="text-black">{item.amount} ml</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#387e64',
  },
  button: {
    backgroundColor: 'red', // You can choose any color you prefer
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextReminder: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  recommendation: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalIntake: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 10,
  },
  progressText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  historyTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  historyItem: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Helth;
