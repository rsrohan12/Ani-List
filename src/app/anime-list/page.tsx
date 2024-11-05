import AnimeList from "@/components/AnimeList";

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Anime Search</h1>
      <AnimeList />
    </div>
  )
}