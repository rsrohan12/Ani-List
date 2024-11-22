import { useState } from 'react'
import{ FilterApp } from './FilterModal'
import { Input } from './ui/input'
import { Search, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from './ui/label'
import { useRouter } from 'next/navigation'
import { categories } from '@/config/animeCategories'

export default function FilterCategory() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sendQuery, setSendQuery] = useState('')
  const [filteredCategories, setFilteredCategories] = useState<number>()
  const [selectedOption, setSelectedOption] = useState("anime");
  
  // const categories = [
    //   'Action', 'Art', 'Adventure', 'Comedy', 'Drama',
    //   'Demons', 'Fantasy', 'Horror', 'Historical', 
    //   'Mystery', 'Martial Arts', 'Music', 'Parody', 'Phsychological', 'Romance', 'Sci-Fi', 
    //   'Sports', 'Samurai', 'Thrillers', 'Vampire'
    // ].filter(category => 
    //   category.toLowerCase().includes(searchQuery.toLowerCase())
    // )

  const router = useRouter()

  const handleSubmit = () => {
    router.push(`/anime-category_list?q=${filteredCategories}`)
    //console.log('Selected category:', selectedCategory)
    setIsOpen(false)
  }
  
  const handleInput = (e:any) => {
    e.preventDefault();

    if(sendQuery.length > 0){
      if(selectedOption === "anime"){
        router.push(`/anime-list?q=${sendQuery}`)
      }
      else{
        router.push(`/manga-list?q=${sendQuery}`)
      }
    }
  }

  return (
    <div className="relative">
        <form onSubmit={handleInput}>
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search..."
              value={sendQuery}
              onChange={(e) => setSendQuery(e.target.value)}
              className="pl-10 pr-20 rounded-md bg-blue-400/20"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer" 
              onClick={handleInput}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600 transition-colors"
              >
                Filter
              </button>
            </div>
          </div>
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="w-[100px] h-9">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="manga">Manga</SelectItem>
            </SelectContent>
          </Select>
         </div>
        </form>
        <FilterApp isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold pr-8 text-white dark:text-white">Select Category</h2>
          <div className='relative'>
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-10 pr-14 rounded-md bg-green-400/20 font-semibold text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto p-2">
            {categories
            .filter(category => category.title.toLowerCase().includes(searchQuery.toLowerCase())) // search for {searchQuery}
            .map((category) => (
              <Label
                key={category.id}
                className="relative flex items-center space-x-3 p-3 bg-white/70 dark:bg-gray-700/70 rounded-lg cursor-pointer hover:bg-white/90 dark:hover:bg-gray-600/90 transition-colors group"
              >
                <Input
                  type="radio"
                  name="category"
                  value={category.title}
                  checked={selectedCategory === category.title}
                  onChange={(e) => {setSelectedCategory(e.target.value)
                    setFilteredCategories(category.id)
                  }}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                  {category.title}
                </span>
              </Label>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedCategory}
            >
              Submit
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
        </FilterApp> 
    </div>
      
  )
}