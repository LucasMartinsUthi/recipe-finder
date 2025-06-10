import { useState, useEffect } from 'react'
import type { Recipe } from '@/utils'
import Image from 'next/image'
import StartSolid from '@/public/star-solid.svg'
import Star from '@/public/star-regular.svg'

type Props = {
    recipe: Recipe
    search: string
}

export default function RecipeCard({ recipe, search }: Props) {
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

        console.log({ recipe })
        console.log({ updatedFavorites })

        localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites))
        setIsFavorite(!isFavorite)
    }

    return (
        <li
            key={recipe.id}
            className="p-4 bg-white rounded-xl shadow-md border border-gray-200"
        >
            <div className="relative">
                <button
                    onClick={handleFavorite}
                    className="absolute top-0 right-0 p-1 transition-transform duration-200 hover:scale-110"
                >
                    <Image src={isFavorite ? StartSolid : Star} alt="Favorite" width={24} height={24} />
                </button>

                <h2 className="text-lg font-semibold text-gray-800">
                    {recipe.recipe_name}
                </h2>
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
    )
}