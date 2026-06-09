import React from "react";
import Middleware from "../../components/Middleware"; // Adjust path as needed
import { Stack } from "expo-router";

export default function HomePageLayout() {
  return (
    <Middleware>
      <Stack screenOptions={{ headerShown: false }} />
    </Middleware>
  );
}
