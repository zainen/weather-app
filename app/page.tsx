'use client';
import { Header } from "@/components/Header";
import { WeatherAppProvider } from "./context/WeatherAppContext";

export default function Home() {
  return (
    <WeatherAppProvider>
      <main className="min-h-screen">
        <Header />
      </main>
    </WeatherAppProvider>
  );
}
