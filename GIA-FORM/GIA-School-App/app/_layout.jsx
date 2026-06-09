import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext"; // Adjust the path if needed

export default function RootLayout() {
  return (
    <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
    </AuthProvider>
  );
}
