import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F5F3EC' },
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
      <Stack>
  <Stack.Screen
    name="index"
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="add-menu"
    options={{ title: 'Capture Menu Information' }}
  />
  <Stack.Screen
    name="menu-list"
    options={{ title: 'Food Items' }}
  />
</Stack>
    </>
  );
}