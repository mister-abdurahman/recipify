import { eachRecipeType, useRecipe } from "../contexts/recipeContext";

export function EachRecipeResult({
  image_url,
  publisher,
  id,
  title,
}: eachRecipeType) {
  const { loadSelectedRecipe } = useRecipe();
  return (
    <div
      onClick={() => loadSelectedRecipe && loadSelectedRecipe(id)}
      className="flex lg:flex-row flex-col items-center sm:gap-5 gap-3 uppercase sm:px-8 sm:py-5 hover:bg-gray-100 hover:-translate-y-2 hover:cursor-pointer transition duration-500"
    >
      <figure className="each-recipe-img relative basis-[4vw] w-24">
        <img
          className="w-full aspect-square rounded-full object-cover"
          src={image_url}
          alt="Forkify image"
        />
      </figure>
      <div className="basis-[12vw]">
        <h3 className="text-[#E83C3C] text-sm md:text-base xl:text-xl">
          {title}
        </h3>
        <h5 className="text-gray-500 text-xs md:text-sm xl:text-base">
          {publisher}
        </h5>
      </div>
    </div>
  );
}
