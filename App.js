import * as React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Dimensions, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/Vector 2.png')}
            style={styles.image} />
      <Text style = {styles.title}> Vive</Text>
      <View style = {styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonShape, styles.NewUserButton]}
          onPress={() => navigation.navigate('New User')}
            >
            <Text style={styles.buttonText}>New User</Text>
            </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonShape, styles.ExistingUserButton]}
          onPress={() => navigation.navigate('Existing User')}
            >
            <Text style={styles.buttonText}>Existing User</Text>
            </TouchableOpacity>
    </View>
    </View>
  );
};

function NewUserScreen({navigation}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style = {styles.title}> Create New Account</Text>
      <View style = {styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.buttonShape, styles.CreateAccountButton]}
          onPress={() => navigation.navigate('New User Quiz', {name})}
            >
            <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
    </View>
    </View>
  );
}

function ExistingUserScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style = {styles.title}> Existing User</Text>
      <View style = {styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.buttonShape, styles.CreateAccountButton]}
          onPress={() => {
            navigation.navigate('Home', {
              screen: 'Home'
            });
          }}            >
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}

function NewUserQuizScreen({route, navigation}) {
  const scrollViewRef = React.useRef(null);
  const {name} = route.params;
  const [ageRange, setAgeRange] = React.useState('');
  const [fitnessLevel, setFitnessLevel] = React.useState('');
  const [workoutType, setWorkoutType] = React.useState('');
  const [description, setDescription] = React.useState('');


  const handleWorkoutTypePress = (type) => {
    if (workoutType.includes(type)) {
      setWorkoutType(workoutType.filter((item) => item !== type));
    }
    else {
      setWorkoutType([...workoutType, type]);
    }
  };

  const handleSubmit = () => {
    console.log('Age Range:', ageRange);
    console.log('Fitness Level:', fitnessLevel);
    console.log('Workout Type:', workoutType);
    console.log('Description:', description);
    navigation.navigate('Home', {
      screen: 'Home'
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
    <ScrollView 
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContainer}
      showVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
    <View style={styles.quizContainer}>
      <Text style = {styles.title}>Welcome {name}! </Text>

      <Text style = {styles.sectionTitle}>Please select your age range:</Text>
      <View style = {styles.buttonContainer}>
        <TouchableOpacity
        style={[
          styles.levelButton,
          ageRange === 'Under 18' && styles.selectedButton,
        ]}
        onPress={() => setAgeRange('Under 18')}
        >
        <Text style={styles.buttonText}>Under 18</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.levelButton,
          ageRange === '18-24' && styles.selectedButton,
        ]}
        onPress={() => setAgeRange('18-24')}
        >
        <Text style={styles.buttonText}>18-24</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[
          styles.levelButton,
          ageRange === '25-34' && styles.selectedButton,
        ]}
        onPress={() => setAgeRange('25-34')}
        >
        <Text style={styles.buttonText}>25-34</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.levelButton,
          ageRange === '35+' && styles.selectedButton,
        ]}
        onPress={() => setAgeRange('35+')}
        >
        <Text style={styles.buttonText}>35+</Text>
        </TouchableOpacity>
      </View>

      <Text style = {styles.sectionTitle}>How would you describe your current fitness level?</Text>
      <View style = {styles.buttonContainer}>
        <TouchableOpacity
        style={[
          styles.levelButton,
          fitnessLevel === 'Beginner' && styles.selectedButton,
        ]}
        onPress={() => setFitnessLevel('Beginner')}
        >
        <Text style={styles.buttonText}>Beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.levelButton,
          fitnessLevel === 'Intermediate' && styles.selectedButton,
        ]}
        onPress={() => setFitnessLevel('Intermediate')}
        >
        <Text style={styles.buttonText}>Intermediate</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.levelButton,
          fitnessLevel === 'Advanced' && styles.selectedButton,
        ]}
        onPress={() => setFitnessLevel('Advanced')}
        >
        <Text style={styles.buttonText}>Advanced</Text>
        </TouchableOpacity>
      </View>

      <Text style = {styles.sectionTitle}>What type of workout are you interested in?</Text>
      <View style = {styles.horizontalButtonContainer}>
        <TouchableOpacity
        style={[
          styles.WorkoutButton,
          workoutType.includes('Yoga') && styles.selectedButton,
        ]}
        onPress={() => handleWorkoutTypePress('Yoga')}
        >
        <Text style={styles.buttonText}>Yoga</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.WorkoutButton,
          workoutType.includes('Strength Training') && styles.selectedButton,
        ]}
        onPress={() => handleWorkoutTypePress('Strength Training')}
        >
        <Text style={styles.buttonText}>Strength Training</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.WorkoutButton,
          workoutType.includes('Cardio') && styles.selectedButton,
        ]}
        onPress={() => handleWorkoutTypePress('Cardio')}
        >
        <Text style={styles.buttonText}>Cardio</Text>
        </TouchableOpacity>
        </View>

        <Text style = {styles.sectionTitle}>Briefly describe your goals:</Text>
        <TextInput
          style={styles.largeInput}
          placeholder="Enter text here..."
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          />

        <TouchableOpacity
        style={[styles.submitButton, styles.levelButton]}
        onPress={handleSubmit}
          >
        <Text style={[styles.buttonText]}>Submit Quiz</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}

function HomeScreen({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if(route.name === 'Wellness') {
            iconName = focused
            ? require('./assets/Wellness.png')
            : require('./assets/Wellness.png');
          } else if(route.name === 'Workouts') {
            iconName = focused
            ? require('./assets/Workouts.png')
            : require('./assets/Workouts.png');
          } else if (route.name === 'Home') {
            iconName = focused
            ? require('./assets/Home.png')
            : require('./assets/Home.png');
          } else if(route.name === 'Meals') {
            iconName = focused
            ? require('./assets/Meals.png')
            : require('./assets/Meals.png');
          } else if(route.name === 'Achievements') {
            iconName = focused
            ? require('./assets/Achievements.png')
            : require('./assets/Achievements.png');
          }
          return <Image source={iconName} style={{width: 35, height: 35}} />;
        },
        tabBarActiveTintColor: '#ACC098',
        tabBarInactiveTintColor: '#5B5D65',
        tabBarStyle: {
          backgroundColor: '#f5f3f1',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          height: 75,
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          height: 75,
          paddingVertical: 10, 
          justifyContent: 'center',
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
    <Tab.Screen name = "Wellness" component={WellnessScreen} />
    <Tab.Screen name = "Workouts" component={WorkoutsScreen} />
    <Tab.Screen name = "Home" component={MainHomeScreen} />
    <Tab.Screen name = "Meals" component={MealsScreen} />
    <Tab.Screen name = "Achievements" component={AchievementsScreen} />
  </Tab.Navigator>
  );
}

function WellnessScreen({navigation}) {
  return (
    <View style={styles.containerWellness}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Wellness</Text>
        <TouchableOpacity>
          <Image 
            source={require('./assets/Profile.png')} 
            style={styles.profileIcon} 
          />
        </TouchableOpacity> 
      </View>

      <TouchableOpacity 
        style={styles.wellnessButton}
        onPress={() => navigation.getParent().navigate('Journal')}
      >
        <Text style={styles.wellnessButtonText}>Journal</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.wellnessExerciseCard}>
        <Text style={styles.wellnessExerciseText}>Breathing Exercises</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.wellnessExerciseCard}>
        <Text style={styles.wellnessExerciseText}>Yoga & Meditation</Text>
      </TouchableOpacity>
    </View>
  );
}

function JournalScreen({navigation}) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  },
  );
  const SAMPLE_ENTRIES = [
    {
      id: '1',
      title: 'First Entry',
      date: 'March 15, 2025',
      content: 'Sample entry text',
    },
    {
      id: '2',
      title: 'Second Entry',
      date: 'March 16, 2025',
      content: 'Sample entry text',
    },
    {
      id: '3',
      title: 'Third Entry',
      date: 'March 17, 2025',
      content: 'Sample entry text',
    },
  ];

return (
  <SafeAreaView style={styles.containerJournal}>
  <View style={styles.journalHeaderContainer}>
    <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      <Text style={styles.headerTitle}>Journal Entries</Text>
    
    <TouchableOpacity 
      style={styles.newEntryButton}
      onPress={() => navigation.navigate('New Journal Entry')}
    >
      <Image 
        source={require('./assets/Plus.png')} 
        style={styles.plusIcon} 
      />
    </TouchableOpacity>
  </View>

  <FlatList
    style={styles.entriesContainer}
    data={SAMPLE_ENTRIES}
    renderItem={({ item }) => (
      <TouchableOpacity 
        style={styles.entryCard}
        onPress={() => navigation.navigate('Journal Entry', { entry: item })}
      >
        <Image 
          source={require('./assets/Journal.png')} 
          style={styles.journalIcon}
          defaultSource={require('./assets/Calendar.png')}
        />
        <View style={styles.entryCardTextContainer}>
          <Text style={styles.entryCardTitle}>{item.title}</Text>
          <Text style={styles.entryCardDate}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={item => item.id}
  />
</SafeAreaView>
  );
}

function JournalEntryScreen({route, navigation}){
  const {entry} = route.params || {
    title: 'Journal Entry',
    date: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    content: ''
  };

return (
  <SafeAreaView style={styles.containerJournal}>
        <View style={styles.journalHeaderContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
          <Text style={styles.dateText}>{entry.date}</Text>
        </View>

        <View style={styles.entryContentContainer}>
          <Text style={[styles.entryCardTitle, { marginBottom: 10 }]}>
            {entry.title}
          </Text>
          <Text style={styles.entryContent}>
            {entry.content}
          </Text>
        </View>
      </SafeAreaView>
  );
}

function NewJournalEntryScreen({navigation}) {
  const scrollViewRef = React.useRef(null);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
    <ScrollView 
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContainer}
      showVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.journalHeaderContainer}>
      <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      <View style={styles.newEntryContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.inputDivider} />
        
        <TextInput
          style={styles.journalInput}
          placeholder="What's on your mind today?"
          value={content}
          onChangeText={setContent}
          multiline={true}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}

function WorkoutsScreen() {
  return (
    <View style={styles.containerWellness}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Workouts</Text>
        <TouchableOpacity>
          <Image 
            source={require('./assets/Profile.png')} 
            style={styles.profileIcon} 
          />
        </TouchableOpacity> 
      </View>
      
      <TouchableOpacity style={styles.wellnessExerciseCard}>
        <Text style={styles.wellnessExerciseText}>Warmup</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.wellnessExerciseCard}>
        <Text style={styles.wellnessExerciseText}>Weight Training</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.wellnessExerciseCard}>
        <Text style={styles.wellnessExerciseText}>Cardio</Text>
      </TouchableOpacity>
    </View>
  );
}

function MainHomeScreen({navigation}) {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleDateString('default', { month: 'long' });
  const weekday = today.toLocaleString('default', { weekday: 'long' });

  const dateString = `${weekday}, ${month} ${day}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good afternoon!</Text>
      <View style={styles.dateContainer}>
        <Image 
          source={require('./assets/Calendar.png')} 
          style={styles.calendarIcon} 
        />
        <Text style={styles.dateText}>{dateString}</Text>
        </View>

        <View style = {styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonShape, styles.NewUserButton]}
          onPress={() => navigation.getParent().navigate('Today\'s Plan')}
            >
            <Text style={styles.buttonText}>Check out today's plan</Text>
            </TouchableOpacity>
    </View>
    </View>
  );
}

function MealsScreen() {
  return (
    <View style={styles.containerWellness}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Meal Plans</Text>
        <TouchableOpacity>
          <Image 
            source={require('./assets/Profile.png')} 
            style={styles.profileIcon} 
          />
        </TouchableOpacity> 
      </View>
      
      <TouchableOpacity style={styles.wellnessExerciseCard}>
        <Text style={styles.wellnessExerciseText}>Breakfast</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.wellnessExerciseCard}>
        <Text style={styles.wellnessExerciseText}>Lunch</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.wellnessExerciseCard}>
        <Text style={styles.wellnessExerciseText}>Dinner</Text>
      </TouchableOpacity>
    </View>
  );
}


function AchievementsScreen() {
  const achievements = [
    {
      id: '1',
      title: 'First Step',
      description: 'Completed first workout',
      icon: require('./assets/Medal.png'),
    },
    {
      id: '2',
      title: 'PR Princess',
      description: 'Set a new personal record in any exercise!',
      icon: require('./assets/Crown.png'),
    },
    {
      id: '3',
      title: 'Vive Veteran',
      description: 'Used the App for 6+ months',
      icon: require('./assets/Ribbon.png'),
    },
    {
      id: '4',
      title: 'Custom Creator',
      description: 'Designed and saved a custom workout',
      icon: require('./assets/Art.png'),
    },
  ];

  return (
    <View style={styles.containerAchievements}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Achievements</Text>
        <TouchableOpacity>
          <Image 
            source={require('./assets/Profile.png')} 
            style={styles.profileIcon} 
          />
        </TouchableOpacity> 
      </View>
      <View style={styles.achievementsGrid}>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementCard}>
            <View style={styles.achievementIconContainer}>
              <Image
                source={achievement.icon}
                style={styles.achievementIcon}
              />
            </View>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>
              {achievement.description}
            </Text>
          </View>
        ))}
      </View>

    </View>
  );
}

function TodaysPlanScreen({navigation}) {
  return (
    <SafeAreaView style={styles.containerJournal}>
      <View style={styles.journalHeaderContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Plan</Text>
        <TouchableOpacity>
          <Image 
            source={require('./assets/Profile.png')} 
            style={styles.profileIcon} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.todaysPlanContentContainer}>
      <View style={styles.planContainer}>
        <Text style={styles.planText}>
          This is some AI generated text for a personalized health/wellness plan for today. It's going to suggest what the user should do and how they can get closer to their goals.
        </Text>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => 
            navigation.navigate('Home', { screen:'Workouts' })}
        >
          <Text style={styles.startButtonText}>Let's get started!</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f3f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height,
    position: 'absolute',
  },
  title: {
    fontWeight: 'bold',    
    fontSize: 30,
    marginBottom: 20,
    color: '#5B5D65',
  },
  sectionTitle: { 
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#5B5D65',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonShape: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    shadowColor: '#ACC098',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  NewUserButton: {
    backgroundColor: '#CCD8C1',
    marginBottom: 10,
  },
  ExistingUserButton: {
    backgroundColor: '#CCD8C1',
  },
  CreateAccountButton: {
    backgroundColor: '#CCD8C1',
  },
  levelButton: {
    width: '75%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#CCD8C1',
    alignItems: 'center',
    marginVertical: 5,
  },
  WorkoutButton: {
    width: 100,
    height: 100,
    paddingVertical: 15,
    borderRadius: 50,
    backgroundColor: '#CCD8C1',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#ACC098',
  },
  buttonText: {
    color: '#5B5D65',
    fontSize: 18,
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#FDFEFC',
    padding: 12,
    marginBottom: 20,
  },
  largeInput: {
    backgroundColor: '#FDFEFC',
    padding: 12,
    marginBottom: 20,
    height: 120,
    width: '80%',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  dateText: {
    fontSize: 18,
  },
  containerPlan: {
    flex: 1,
    backgroundColor: '#f5f3f1',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 50,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#5B5D65',
    alignItems: 'center',
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  planContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    minHeight: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todaysPlanContentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  planText: {
    fontSize: 16,
    color: '#5B5D65',
    lineHeight: 24,
    flex: 1,
  },
  startButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#CCD8C1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 20,
  },
  startButtonText: {
    color: '#5B5D65',
    fontSize: 14,
  },
  containerWellness: {
    flex: 1,
    backgroundColor: '#f5f3f1',
    alignItems: 'center',
    paddingTop: 50,
  },
  wellnessButton: {
    width: '90%',
    paddingVertical: 15,
    backgroundColor: '#CCD8C1',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  wellnessButtonText: {
    color: '#5B5D65',
    fontSize: 18,
    fontWeight: '500',
  },
  wellnessExerciseCard: {
    width: '90%',
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginVertical: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  wellnessExerciseText: {
    color: '#5B5D65',
    fontSize: 16,
    fontWeight: '500',
  },
  containerJournal: {
    flex: 1,
    backgroundColor: '#f5f3f1',
  },
  journalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: 'column',
  },
  backButtonText: {
    fontSize: 18,
    color: '#5B5D65',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    color: '#8A8D91',
  },
  newEntryButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 24,
    height: 24,
  },
  entriesContainer: {
    padding: 20,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  journalIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  entryCardTextContainer: {
    flexDirection: 'column',
  },
  entryCardTitle: {
    fontSize: 16,
    color: '#5B5D65',
    fontWeight: '500',
  },
  entryCardDate: {
    fontSize: 14,
    color: '#8A8D91',
  },
  entryContentContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  entryContent: {
    fontSize: 16,
    color: '#5B5D65',
    lineHeight: 24,
  },
  newEntryContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  journalInput: {
    flex: 1,
    fontSize: 16,
    color: '#5B5D65',
    textAlignVertical: 'top',
  },
  saveButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#CCD8C1',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#5B5D65',
    fontSize: 16,
    fontWeight: '500',
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5B5D65',
    padding: 5,
    marginBottom: 10,
  },
  inputDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    width: '100%',
    marginBottom: 15,
  },
  containerAchievements: {
    flex: 1,
    backgroundColor: '#f5f3f1',
    alignItems: 'center',
    paddingTop: 50,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  achievementIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#EFF4E7',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementIcon: {
    width: 35,
    height: 35,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5B5D65',
    textAlign: 'center',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#8A8D91',
    textAlign: 'center',
    lineHeight: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f3f1',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 30,
  },
  quizContainer: {
    flex: 1,
    backgroundColor: '#f5f3f1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 30, 
  }
});
const Stack = createStackNavigator();

function RootStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="New User" component={NewUserScreen} />
      <Stack.Screen name="Existing User" component={ExistingUserScreen} />
      <Stack.Screen name="New User Quiz" component={NewUserQuizScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Today's Plan" component={TodaysPlanScreen} options={{headerShown: false}} />
      <Stack.Screen name="Journal" component={JournalScreen} options={{headerShown: false}}/>
      <Stack.Screen name="New Journal Entry" component={NewJournalEntryScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Journal Entry" component={JournalEntryScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );  
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

