import { useState } from "react";
import { RecipeDetail } from "./components/RecipeDetail";
import RecipeForm from "./components/RecipeForm";
import { RecipesResult } from "./components/RecipesResult";
import { SearchBar } from "./components/SearchBar";
import { RecipeProvider } from "./contexts/recipeContext";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <RecipeProvider>
        <div className="container relative h-screen mx-auto min-w-full text-sm sm:text-base bg-gray-100">
          <SearchBar setOpen={setOpen} />
          <RecipesResult />
          <RecipeDetail />
          {open ? <RecipeForm setOpen={setOpen} /> : null}
        </div>
      </RecipeProvider>
    </div>
  );
}

export default App;

// things left to do:
// "delete recipe"
// responsiveness
