import { eachRecipeType, useRecipe } from "../contexts/recipeContext";


export function EachRecipeResult({ image_url, publisher, id, title }: eachRecipeType) {
    const { loadSelectedRecipe } = useRecipe()
    return <div onClick={() => loadSelectedRecipe && loadSelectedRecipe(id)} className="flex md:flex-row flex-col items-center md:gap-8 sm:gap-4 gap-2 uppercase md:px-12 sm:px-8 md:py-8 sm:py-5 hover:bg-gray-100 hover:-translate-y-2 hover:cursor-pointer transition duration-500">
        <figure className="each-recipe-img relative md:basis-[4vw] w-[6rem]">
            <img className="w-full aspect-square rounded-full object-cover" src={image_url} alt="Forkify image" />
        </figure>
        <div className="basis-[15vw]"><h3 className="text-[#E83C3C] md:text-2xl sm:text-md text-[1.2rem]">{title}</h3><h5 className="text-gray-500 md:text-xl text-sm">{publisher}</h5></div>
    </div>
}