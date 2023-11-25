import { useState } from "react";
import { eachRecipeType, useRecipe } from "../contexts/recipeContext";
import { EachRecipeResult } from "./EachRecipe";
import { Pagination } from "./Pagination";
import { Footer } from "./Footer";
import Loader from "./Loader";
import ErrorMsg from "./ErrorMsg";

export function RecipesResult() {
  const { recipes, loading, error } = useRecipe();
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(10);

  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes?.slice(firstRecipeIndex, lastRecipeIndex);

  function nextPage() {
    setCurrentPage((prev) => prev + 1);
  }
  function prevPage() {
    setCurrentPage((prev) => prev - 1);
  }

  return (
    <div className="recipe-result bg-white flex md:flex-col md:gap-0 gap-3 md:mt-0 sm:mt-6 py-3 px-2">
      {error ? (
        <ErrorMsg message={error} />
      ) : loading ? (
        <Loader />
      ) : (
        currentRecipes?.map((el: eachRecipeType) => (
          <EachRecipeResult
            image_url={el.image_url}
            publisher={el.publisher}
            key={el.id}
            title={el.title}
            id={el.id}
          />
        ))
      )}
      <div className="md:mt-auto">
        <Pagination
          lastRecipeIndex={lastRecipeIndex}
          currentRecipes={currentRecipes}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
        <Footer>
          <p>© Copyright by Abdurahman Aramide.</p>
          <p>Search for your favourite meal and bookmark it today !.</p>
        </Footer>
      </div>
    </div>
  );
}
