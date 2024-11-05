'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from './ui/skeleton'

export default function AnimeGrid() {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchTopAnime = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=16");
        const data = await response.json();
        setAnimeList(data.data);
      } catch (error) {
        console.error("Error fetching top anime:", error);
      }
      finally{
        setIsLoading(false)
      }
    };

    useEffect(() => {
        fetchTopAnime();
      }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Top Anime</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
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
        :animeList.map((anime) => (
          <motion.div
            key={anime.mal_id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="overflow-hidden cursor-pointer" onClick={() => setSelectedAnime(anime)}>
              <CardContent className="p-0">
                <Image
                  src={anime.images?.jpg?.image_url || '/placeholder.svg'}
                  alt={anime.title}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 truncate">{anime.title}</h2>
                  <p className='h-[50px] overflow-hidden'> {anime.synopsis}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">⭐ Score: {anime.score || 'N/A'}</Badge>
                    <Badge variant="outline">{anime.genres?.[0]?.name || 'Unknown'}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedAnime} onOpenChange={(open) => !open && setSelectedAnime(null)}>
        <DialogContent>
          {selectedAnime && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAnime.title}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Image
                  src={selectedAnime.images?.jpg?.image_url || '/placeholder.svg'}
                  alt={selectedAnime.title}
                  width={300}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <div>
                  <p className="mb-2"><strong>Score:</strong> {selectedAnime.score || 'N/A'}</p>
                  <p className="mb-2"><strong>Genres:</strong> {selectedAnime.genres?.map(g => g.name).join(', ') || 'Unknown'}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}