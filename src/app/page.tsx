"use client"

import { CarouselSize } from "@/components/SlideCarousel";
import TopAnime from "@/components/TopAnime";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Platform</h1>
      <h2 className="text-center text-muted-foreground text-xl">
        Start exploring
      </h2>
      <div className="my-7 flex place-items-center">
        <CarouselSize />
      </div>
      <div className="flex items-center justify-center">
      
      </div>
      <div className="text-center my-8">
        <Link href="/anime-list">
          <Button variant="default" size="sm" className="hover:text-gray hover:scale-105 transition-transform duration-300 ease-in-out">GO for<span className="text-yellow-500/70 text-base font-bold">Anime</span></Button>
        </Link>
        <Link href="/manga-list">
          <Button variant="secondary" size="sm" className="ml-4 hover:text-gray hover:scale-105 transition-transform duration-300 ease-in-out">GO for<span className="text-purple-600/65 text-base font-bold">Manga</span></Button>
        </Link>
      </div>
      <div className="mt-8 p-6 shadow-sm">
        <TopAnime />
      </div>
    </div>
  );
}