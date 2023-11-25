import { useState } from "react";
import logo from "../assets/favicon.png";
import svg from "../assets/icons.svg";
import { useRecipe } from "../contexts/recipeContext";
import BookmarkList from "./BookmarkList";

export function SearchBar({ setOpen }: any) {
  const [query, setQuery] = useState("");
  const { loadRecipes } = useRecipe();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    loadRecipes && loadRecipes(query);
  }

  return (
    <div className="search-bar relative flex flex-wrap justify-between items-center px-10 md:px-8  bg-slate-50">
      <div className="flex items-center gap-3">
        <figure className="lg:h-16 md:h-12 lg:w-16 md:w-12 h-10 w-10">
          <img src={logo} alt="search icon" className="w-full h-full" />
        </figure>
        <h4 className="font-secondary md:text-3xl xl:text-4xl text-2xl font-bold">
          Recipify
        </h4>
      </div>
      <form
        action=""
        className="input-bar flex relative m-auto sm:focus-within:-translate-y-[2px] md:p-0 p-8 transition-all duration-500"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search Recipes..."
          className="sm:p-4 p-2 rounded-full md:w-[30vw] outline-none text-sm sm:text-base"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-br from-yellow-200 to-red-500 text-white flex items-center gap-2 md:gap-3 lg:gap-4 uppercase text-sm md:text-base lg:text-xl lg:py-3 md:px-5 lg:px-8 md:py-2 py-1 px-3 -ml-8 md:-ml-20 lg:-ml-32 rounded-full hover:scale-[1.05] transition duration-500"
        >
          <svg className="lg:w-10 lg:h-10 md:w-6 md:h-6 w-4 h-4">
            <use href={`${svg}#icon-search`}></use>
          </svg>{" "}
          Search
        </button>
        <span className="sm:hidden text-xs absolute bottom-0 left-1/2 -translate-x-1/2">
          Search 1,000+ recipes
        </span>
      </form>

      <nav className="flex list-none self-stretch sm:ml-0 ml-auto">
        <li
          onClick={() => setOpen(true)}
          className="flex md:text-base text-sm items-center p-4 uppercase h-full hover:bg-gray-200"
        >
          {" "}
          <svg className="w-10 h-10">
            <use href={`${svg}#icon-edit`}></use>
          </svg>{" "}
          <span className="lg:block hidden"> Add recipe </span>
        </li>
        <div className="group">
          <li className="flex md:text-base text-sm items-center p-4 uppercase h-full hover:bg-gray-200">
            {" "}
            <svg className="w-10 h-10">
              <use href={`${svg}#icon-bookmark`}></use>
            </svg>{" "}
            <span className="lg:block hidden">Bookmarks</span>
          </li>
          <div className="bg-white hidden absolute z-10 top-42 right-0 group-hover:block">
            <BookmarkList />
          </div>
        </div>
      </nav>
    </div>
  );
}
