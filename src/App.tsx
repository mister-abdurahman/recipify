import { useState } from 'react';
import { RecipeDetail } from "./components/RecipeDetail"
import RecipeForm from "./components/RecipeForm"
import { RecipesResult } from "./components/RecipesResult"
import { SearchBar } from "./components/SearchBar"
import { RecipeProvider } from "./contexts/recipeContext"


function App() {
  const [open, setOpen] = useState(false);

  return <div>
    <RecipeProvider>
      <div className="container relative lg:min-h-[80vh] min-h-screen mx-auto lg:min-w-[90%] min-w-full text-[1rem] lg:text-base lg:my-16 bg-gray-100 rounded-md">
        <SearchBar setOpen={setOpen} />
        <RecipesResult />
        <RecipeDetail />
        {open ? <RecipeForm setOpen={setOpen} /> : null}
      </div>
    </RecipeProvider>
  </div>
}

export default App

// things left to do:
// "delete recipe"
// responsiveness