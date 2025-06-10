import { useState, useEffect } from 'react'
import type { Recipe } from '@/utils'
import RecipeCard from '@/components/RecipeCard'
import RecipeModal from '@/components/RecipeModal'
import Lupa from '@/public/magnifying-glass-solid.svg'
import Image from 'next/image'

export default function Home() {
  const [data, setData] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | undefined>()

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }, [])

  const filteredRecipes = data.filter((recipe) =>
    recipe.recipe_name.toLowerCase().includes(search.toLowerCase()) ||
    recipe.ingredients_required.some((ingredient) =>
      ingredient.toLowerCase().includes(search.toLowerCase())
    )
  ).sort((a, b) => {
    return b.ingredients_required.length - a.ingredients_required.length
  })

  const handleOpen = (id: string) => {
    setSelectedId(id)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 items-start">
      <div className="w-full max-w-xl space-y-6 ">
        <h1 className='text-5xl tracking-tight sm:text-6xl text-pretty'>Recipe Finder</h1>

        <div className="relative w-full">
          <Image src={Lupa} alt="Search Icon" width={20} height={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search for a recipe..."
            className="w-full pl-10 pr-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : filteredRecipes.length === 0 ? (
          <p className="text-center text-gray-600">No recipes found.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} search={search} handleOpen={handleOpen} />
              ))}
            </ul>
            <RecipeModal recipeId={selectedId} isOpen={modalOpen} onClose={() => {
              setModalOpen(false)
              setSelectedId(undefined)
            }} />
          </>
        )}
      </div>
    </div>
  )
}
