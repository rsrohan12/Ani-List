"use client"

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AnimeListContent() {
  const params = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [animeList, setAnimeList] = useState<Anime[]>([]); // Explicitly typed as Anime[]
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)

  const query = params.get('q') || ''; // Get the query parameter from the URL
  const check = async() => {
    if(query.length > 0){
      setIsLoading(true)
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
        const data = await response.json();
        setAnimeList(data.data); // Now TypeScript knows data.data is of type Anime[]
      } catch (error) {
        console.error('Error fetching anime:', error);
      }
      finally{
        setIsLoading(false)
      }
    }
    else{
      console.log("No query found")
    }
  }
  useEffect(() => {
    check(); // Fetch anime when the page loads or when the query parameter changes.
    // This will ensure that the anime list is always up to date.
  }, [params])

  return (
    <div className="container mx-auto py-8">
    <h1 className="text-4xl font-bold mb-8 text-center">Anime Search</h1>
    {query.length <= 0 && <span className="text-2xl border-b-2 border-cyan-700">Search to see the <span className="text-pink-600/75 text-2xl ">details...</span> </span>}
    <ScrollArea className="h-[calc(100vh-240px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Skeleton className="h-48 w-full" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))
            : animeList.map((anime) => (
                <Card key={`${anime.mal_id}-${animeList.indexOf(anime)}`} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">{anime.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{anime.synopsis}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full" onClick={() => setSelectedAnime(anime)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl w-11/12 max-h-[90vh]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">{selectedAnime?.title}</DialogTitle>
                          <DialogDescription>Anime Details</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="mt-4 max-h-[calc(90vh-120px)]">
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <img
                                src={selectedAnime?.images.jpg.image_url}
                                alt={selectedAnime?.title}
                                className="w-full h-auto object-cover rounded-md"
                              />
                              <div className="md:col-span-2 space-y-4">
                                <div className="grid grid-cols-3 items-center gap-2">
                                  <span className="font-bold">Score:</span>
                                  <span className="col-span-2">{selectedAnime?.score}</span>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-2">
                                  <span className="font-bold">Episodes:</span>
                                  <span className="col-span-2">{selectedAnime?.episodes}</span>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-2">
                                  <span className="font-bold">Status:</span>
                                  <span className="col-span-2">{selectedAnime?.status}</span>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-2">
                                  <span className="font-bold">Aired:</span>
                                  <span className="col-span-2">{selectedAnime?.aired.string}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold mb-2">Synopsis</h3>
                              <p>{selectedAnime?.synopsis}</p>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
        </div>
      </ScrollArea>
  </div>
  );
}

export default function AnimeList() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <AnimeListContent />
      </Suspense>
    )
  }