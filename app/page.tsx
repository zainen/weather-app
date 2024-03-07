import { Header } from "@/components/Header";
import { WeatherTile } from "@/components/WeatherTile";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <WeatherTile />
    </main>
  );
}
