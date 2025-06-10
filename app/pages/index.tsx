import { useState, useEffect } from 'react'
import type { Recipe } from '@/utils'
import RecipeCard from '@/components/RecipeCard'

export default function Home() {
  const [data, setData] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
        console.log('Data fetched:', data)
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err)
        setIsLoading(false)
      })
  }, [])

  const filteredRecipes = data.filter((recipe) =>
    recipe.recipe_name.toLowerCase().includes(search.toLowerCase()) ||
    recipe.ingredients_required.some((ingredient) =>
      ingredient.toLowerCase().includes(search.toLowerCase())
    )
  )

  console.log('Filtered recipes:', filteredRecipes)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 items-start">
      <div className="w-full max-w-xl space-y-6 ">
        <div><h1>Recipe Finder</h1></div>
        <input
          type="text"
          placeholder="Search for a recipe..."
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p>Current input: {search}</p>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : filteredRecipes.length === 0 ? (
          <p className="text-center text-gray-600">No recipes found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} search={search} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
