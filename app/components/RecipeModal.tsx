import { useEffect, useState } from 'react'
import type { Recipe } from '@/utils'
import Image from 'next/image'
import X from '@/public/x-solid.svg'

type Props = {
    recipeId?: string
    isOpen: boolean
    onClose: () => void
}

export default function RecipeModal({ recipeId, isOpen, onClose }: Props) {
    if (!isOpen) return null
    if (!recipeId) return null

    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isOpen) return

        setIsLoading(true)
        fetch(`http://localhost:5000/recipes/${recipeId}`)
            .then((res) => res.json())
            .then((data) => {
                setRecipe(data)
                setIsLoading(false)
            })
    }, [isOpen, recipeId])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:scale-110"
                >
                    <Image src={X} alt="Close" width={12} height={12} />
                </button>

                {isLoading ? (
                    <p>Loading recipe...</p>
                ) : recipe ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">{recipe.recipe_name}</h2>

                        <Image src={recipe.image || '/placeholder.png'} alt={recipe.recipe_name} width={400} height={200} className="mb-4 rounded" />

                        <h3 className="font-semibold">Ingredients:</h3>
                        <ul className="list-disc list-inside mb-4">
                            {recipe.ingredients_required.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>

                        <h3 className="font-semibold">Instructions:</h3>
                        <p className="text-gray-700 whitespace-pre-line">{recipe.cooking_instructions}</p>
                    </>
                ) : (
                    <p>Recipe not found.</p>
                )}
            </div>
        </div>
    )
}