import { useRecipe } from "../contexts/recipeContext";

export function Pagination({
  currentRecipes,
  currentPage,
  nextPage,
  prevPage,
  lastRecipeIndex,
}: any) {
  const { recipes } = useRecipe();

  if (currentRecipes.length < 1) return;

  return (
    <div className="pagination flex flex-col sm:flex-row gap-2 justify-between py-4 px-4 text-brand--2 text-xs font-semibold">
      {currentPage > 1 ? (
        <button
          onClick={prevPage}
          className="bg-gray-100 px-4 py-2 rounded-full"
        >
          &larr; Page {currentPage - 1}
        </button>
      ) : (
        <>&nbsp;</>
      )}
      <button className="bg-gray-100 px-4 py-2 rounded-full w-max">
        {currentPage}
      </button>
      {lastRecipeIndex < recipes?.length! ? (
        <button
          onClick={nextPage}
          className="bg-gray-100 px-4 py-2 rounded-full w-max"
        >
          Page {currentPage + 1} &rarr;
        </button>
      ) : (
        <>&nbsp;</>
      )}
    </div>
  );
}
