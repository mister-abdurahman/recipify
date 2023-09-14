import { useRecipe } from "../contexts/recipeContext"

export function Pagination({ currentRecipes, currentPage, nextPage, prevPage, lastRecipeIndex }: any) {
    const { recipes } = useRecipe()

    if (currentRecipes.length < 1) return;

    return <div className='flex md:flex-row gap-2 sm:flex-col justify-between py-4 px-12 text-brand--2'>
        {currentPage > 1 ? <button onClick={prevPage} className='bg-gray-100 px-6 py-2 rounded-full'>&larr; Page {currentPage - 1}</button> : <>&nbsp;</>}
        <button className='bg-gray-100 px-4 py-2 rounded-full'>{currentPage}</button>
        {lastRecipeIndex < recipes?.length! ? <button onClick={nextPage} className='bg-gray-100 px-6 py-2 rounded-full'>Page {currentPage + 1} &rarr;</button> : <>&nbsp;</>}
    </div>
}