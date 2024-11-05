
import { Card, CardContent } from "@/components/ui/card"
import { animeItems } from "@/config/animeItems"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function CarouselSize() {
  
  const router = useRouter()
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 place-items-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent  className="-ml-2 md:-ml-4">
            {animeItems.map((item) => (
              <CarouselItem key={item.name} className="pl-2 sm:pl-4 basis-3/4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                <div className="aspect-square overflow-hidden rounded-xl">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={600}
                        height={400}
                        onClick={() => { 
                          router.push(`/anime-list?q=${item.name}`)
                        }}
                        className="cursor-pointer object-cover w-full h-full transition-transform hover:scale-105"
                    />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div>
          <CarouselPrevious className="absolute top-1/2 ml-3 -translate-y-1/2" />
          <CarouselNext className="absolute top-1/2  mr-3 -translate-y-1/2" />
        </div>
        </Carousel>
    </div>
  )
}
