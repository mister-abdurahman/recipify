import { selectedRecipeType, useRecipe } from "../contexts/recipeContext";
import { useState } from "react";
import svg from "../assets/icons.svg";
import Loader from "./Loader";
import ErrorMsg from "./ErrorMsg";

export function RecipeDetail() {
  const {
    selectedRecipe,
    loadingSelected,
    errorSelected,
    bookmarkList,
    dispatch,
    deleteSelectedRecipeFromAPI,
  } = useRecipe();
  // const bookmarked = JSON.parse(localStorage.getItem('recipes')!)
  if (!selectedRecipe) return;
  const {
    cooking_time,
    id,
    image_url,
    ingredients,
    publisher,
    servings,
    source_url,
    title,
    key,
  }: any = selectedRecipe;

  const [incServing, setIncServing] = useState(0);

  function plusBtn() {
    setIncServing((prev) => prev + 1);
  }
  function minusBtn() {
    setIncServing((prev) => {
      if (prev <= -1) return 0;
      return prev - 1;
    });
  }

  return (
    <div className="recipe-detail bg-gray-100 relative md:mt-0 sm:mt-6">
      {errorSelected ? (
        <ErrorMsg message={errorSelected} />
      ) : loadingSelected ? (
        <Loader />
      ) : (
        <div>
          <figure className="recipe-detail--img w-full h-[50vh] relative">
            <img
              className="w-full h-full object-cover"
              src={image_url}
              alt="Image"
            />
          </figure>
          <h1 className="absolute text-center uppercase text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-semibold -skew-y-6 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ">
            <span className="styled-recipe-title leading-relaxed bg-gradient-to-br from-yellow-300 to-red-600">
              {title}
            </span>
          </h1>
          <div className="recipe-info flex flex-wrap gap-y-4 justify-evenly items-center px-4 py-20 uppercase">
            <h3 className="flex items-center gap-4 text-base xl:text-2xl md:text-xl">
              <svg className="w-10 h-10">
                <use href={`${svg}#icon-clock`}></use>
              </svg>
              <strong>{cooking_time}</strong>minutes
            </h3>
            <h3 className="flex items-center gap-4 text-base xl:text-2xl md:text-xl">
              <svg className="w-10 h-10">
                <use href={`${svg}#icon-users`}></use>
              </svg>
              <strong>{servings + incServing}</strong>servings
            </h3>
            <div className="flex gap-3">
              <button
                onClick={minusBtn}
                className="text-2xl md:text-3xl xl:text-4xl hover:-translate-y-1 p-3 transition duration-500 h-5 md:h-7 xl:h-10 flex justify-center items-center aspect-square border-4 rounded-full border-brand--2 text-brand--2 font-extrabold"
              >
                -
              </button>
              <button
                onClick={plusBtn}
                className="text-2xl md:text-3xl xl:text-4xl hover:-translate-y-1 p-3 transition duration-500 h-5 md:h-7 xl:h-10 flex justify-center items-center aspect-square border-4 rounded-full border-brand--2 text-brand--2 font-extrabold"
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-6">
              <svg
                className={`w-14 h-14 cursor-pointer bg-gray-200 p-3 rounded-full ${
                  key ? "" : "hidden"
                }`}
              >
                <use href={`${svg}#icon-user`}></use>
              </svg>
              {bookmarkList?.find((el: selectedRecipeType) => el.id === id) ? (
                <svg
                  onClick={() =>
                    dispatch({ type: "removeFromBookmarked", payload: id })
                  }
                  className="cursor-pointer flex detail-bookmark md:w-16 w-14 md:h-16 h-14 p-4 hover:scale-110 transition duration-500 rounded-full bg-gradient-to-br from-yellow-300 to-red-600"
                >
                  <use href={`${svg}#icon-bookmark-fill`}></use>
                </svg>
              ) : (
                <svg
                  onClick={() =>
                    dispatch({
                      type: "addToBookmarked",
                      payload: selectedRecipe,
                    })
                  }
                  className="cursor-pointer flex detail-bookmark md:w-16 w-14 md:h-16 h-14 p-4 hover:scale-110 transition duration-500 rounded-full bg-gradient-to-br from-yellow-300 to-red-600"
                >
                  <use href={`${svg}#icon-bookmark`}></use>
                </svg>
              )}
              <svg
                onClick={() => deleteSelectedRecipeFromAPI!(id)}
                className={`w-8 h-8 cursor-pointer ${key ? "" : "hidden"}`}
              >
                <use href={`${svg}#icon-bin`}></use>
              </svg>
            </div>
          </div>
          <div className="ingredients text-center py-20 bg-[#f2efee]">
            <h1 className="uppercase text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6 text-brand--2">
              Recipe Ingredients
            </h1>
            <ul className="ingredient-list mx-2 sm:mx-12 md:mx-20">
              {ingredients.map((el: any, i: any) => (
                <li
                  key={i}
                  className="flex justify-left gap-1 sm:gap-4 not-last:pb-4 text-xs sm:text-sm md:text-base xl:text-xl text-gray-700"
                >
                  <svg className="w-10 h-10">
                    <use href={`${svg}#icon-check`}></use>
                  </svg>
                  <div>
                    {el.quantity + (el.quantity / servings) * incServing}
                    {el.unit}
                  </div>
                  <div className="capitalize text-left">{el.description}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cook text-center flex flex-col items-center py-10 gap-5 md:gap-8 lg:gap-12 xl:gap-16">
            <h1 className="uppercase text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-brand--2">
              How to cook it
            </h1>
            <p className="text-base md:text-2xl lg:text-3xl xl:text-3xl md:px-40 px-8 text-slate-500">
              This recipe was carefully designed and tested by{" "}
              <strong>{publisher}</strong>. Please check out directions at their
              website.
            </p>
            <a
              href={`${source_url}`}
              target="_blank"
              className="bg-gradient-to-br from-yellow-200 to-red-500 text-white flex items-center gap-4 uppercase text-base md:text-xl lg:text-2xl md:px-8 px-5 md:py-4 py-2 rounded-full hover:scale-[1.05] transition duration-500"
            >
              Directions{" "}
              <svg className="lg:w-10 md:w-8 w-5 lg:h-10 md:h-8 h-5">
                <use href={`${svg}#icon-send`}></use>
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
