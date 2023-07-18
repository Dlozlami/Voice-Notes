import { Tabs } from 'expo-router/tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hide tab labels
        activeTintColor: '#e63f59',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
            title:'Record',
            headerShown: false,
          tabBarIcon: ({ focused,color, size }) => (
            <MaterialCommunityIcons name="record-circle-outline" size={24} style={{color: focused ? 'red' : 'gray'}} />
          ),
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
            title:'Voice Notes',
            headerShown: false,
          tabBarIcon: ({ focused,color, size }) => (
            <Ionicons name="list" size={24} style={{color: focused ? 'red' : 'gray'}}  />
          ),
        }}
      />
      
    </Tabs>
  );
}