import { useState, useEffect } from 'react'
import type { Recipe } from '@/utils'
import Image from 'next/image'
import StartSolid from '@/public/star-solid.svg'
import Star from '@/public/star-regular.svg'

type Props = {
    recipe: Recipe
    search: string
    handleOpen: (id: string) => void
}

export default function RecipeCard({ recipe, search, handleOpen }: Props) {
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]')
        const isFavorite = storedFavorites.some((id: string) => id === recipe._id)
        setIsFavorite(isFavorite)
    }, [recipe._id])

    const found_ingredients = recipe.ingredients_required?.filter((i) =>
        i.toLowerCase().includes(search.toLowerCase())
    ).join(', ')

    const handleFavorite = () => {
        const stored = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]')

        let updatedFavorites

        if (isFavorite) {
            updatedFavorites = stored.filter((id: string) => id !== recipe._id)
        } else {
            updatedFavorites = [...stored, recipe._id]
        }

        localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites))
        setIsFavorite(!isFavorite)
    }

    return (
        <div className="relative">
            <button
                onClick={handleFavorite}
                className="absolute top-0 right-0 p-1 transition-transform duration-200 hover:scale-110 p-4"
            >
                <Image src={isFavorite ? StartSolid : Star} alt="Favorite" width={24} height={24} />
            </button>
            <li
                key={recipe._id}
                className="p-4 bg-white rounded-xl shadow-md border border-gray-200"
                onClick={() => handleOpen(recipe._id)}
            >

                <h2 className="text-lg font-semibold text-gray-800 max-w-md">
                    {recipe.recipe_name}
                </h2>

                <div className="flex flex-col items-center py-2">
                    <Image src={recipe.image || '/placeholder.png'} alt={recipe.recipe_name} width={80} height={80} className="mt-2 rounded-lg object-cover" />
                </div>

                {
                    found_ingredients.length > 0 &&
                    <p
                        className="text-sm text-gray-600 truncate whitespace-nowrap overflow-hidden"
                        title={found_ingredients}
                    >
                        {found_ingredients}
                    </p>
                }
            </li >
        </div>
    )
}