import { createContext, useContext, useReducer } from "react";
import BookmarkList from "../components/BookmarkList";

export const BASE_URL = `https://forkify-api.herokuapp.com/api/v2/recipes`;

export const KEY = `d42b1abe-462b-4ab9-be18-010d353e7614`;

interface recipeContextType {
    recipes?: eachRecipeType[],
    selectedRecipe?: {},
    loadRecipes?: (x: string) => void,
    error?: string,
    errorSelected?: string,
    loading?: boolean,
    loadingSelected?: boolean,
    loadSelectedRecipe?: (X: string) => void,
    addToBookmarkList?: (X: any) => void,
    removeFromBookmarkList?: (X: any) => void,
    bookmarkList?: selectedRecipeType[],
    dispatch?: any,
    deleteSelectedRecipeFromAPI?: (x: string) => void
}

const RecipeContext = createContext<recipeContextType>({});

interface actionType {
    type: string,
    payload: any
}
export interface eachRecipeType {
    publisher: string,
    image_url: string,
    title: string,
    id: string
}
interface ingredientType {
    description: string,
    quantity: string,
    unit: string
}
export interface selectedRecipeType {
    cooking_time: string,
    id: string,
    image_url: string,
    ingredients: ingredientType[],
    publisher: string,
    servings: string,
    source_url: string,
    title: string,
    key?: string
}

interface stateType {
    recipes: eachRecipeType[],
    error: string,
    errorSelected: string,
    loading: boolean,
    loadingSelected: boolean,
    selectedRecipe?: selectedRecipeType | null,
    bookmarkList?: selectedRecipeType[]
}
const initialState = {
    recipes: [],
    error: "",
    errorSelected: "",
    loading: false,
    loadingSelected: false,
    selectedRecipe: null,
    bookmarkList: []
}

// whatever data we return in the switch has to match with the data type of state
function reducer(state: stateType, action: actionType) {
    switch (action.type) {
        case "recipes": return { ...state, recipes: action.payload }
        case "selectedRecipe": return { ...state, selectedRecipe: action.payload }
        case "loading": return { ...state, loading: action.payload }
        case "loadingSelected": return { ...state, loadingSelected: action.payload }
        case "addToBookmarked":
            function addToBookmarkList(selected: any) {
                if (state.bookmarkList?.find((el: selectedRecipeType) => el.id === selected.id)) return state.bookmarkList;
                else state.bookmarkList?.push(selected);
                localStorage.setItem("recipes", JSON.stringify(state.bookmarkList));
                return state.bookmarkList
            }
            return { ...state, bookmarkList: addToBookmarkList(action.payload) }
        case "removeFromBookmarked":
            function removeFromBookmarkList(id: string) {
                const updated = state.bookmarkList?.filter(el => el.id !== id)
                localStorage.setItem("recipes", JSON.stringify(updated));
                if (updated) return updated;
                else return state.bookmarkList
            }
            return { ...state, bookmarkList: removeFromBookmarkList(action.payload) }
        case "error": return { ...state, error: action.payload }
        case "errorSelected": return { ...state, errorSelected: action.payload }
        // case "addToBookmarkList": return {
        //     ...state, bookmarkList:  state.bookmarkList?.includes(action.payload) ? state.bookmarkList : state.bookmarkList?.push(action.payload)
        // };
        default: return state;
    }
}

function RecipeProvider({ children }: any) {
    const [stateData, dispatch] = useReducer(reducer, initialState)
    const { recipes, error, loading, loadingSelected, errorSelected, selectedRecipe, bookmarkList } = stateData;

    async function loadRecipes(query: string) {
        try {
            dispatch({ type: "loading", payload: true })
            dispatch({ type: "error", payload: "" })
            const res = await fetch(`${BASE_URL}?search=${query}&key=${KEY}`)
            if (!res.ok) throw new Error("An error occured while fetching data")
            const resJSON = await res.json()
            if (resJSON.results === 0) throw new Error("Sorry we do not have a recipe for your search, Try something else. 👍");
            const recipesArr = resJSON.data.recipes
            dispatch({ type: 'recipes', payload: recipesArr })
        } catch (error: any) {
            dispatch({ type: "error", payload: error.message })
        } finally {
            dispatch({ type: "loading", payload: false })
        }
    }

    async function loadSelectedRecipe(id: string) {
        try {
            dispatch({ type: "errorSelected", payload: "" })
            dispatch({ type: "loadingSelected", payload: true })
            const res = await fetch(`${BASE_URL}/${id}`)
            if (!res.ok) throw new Error("An error occured while fetching data")
            const resJSON = await res.json()
            const result = resJSON.data.recipe
            dispatch({ type: "selectedRecipe", payload: result })
        } catch (error: any) {
            dispatch({ type: "errorSelected", payload: error.message })
        } finally {
            dispatch({ type: "loadingSelected", payload: false })
        }
        // console.log(resJSON.data.recipe)
    }
    // async function removeFromBookmarkList(id: string) {
    //     const updated = bookmarkList?.filter(el => el.id !== id)
    //     localStorage.setItem("recipes", JSON.stringify(updated));
    // }

    async function deleteSelectedRecipeFromAPI(id: string) {
        try {
            dispatch({ type: "loadingSelected", payload: true })
            const res = await fetch(`${BASE_URL}/${id}?key=${KEY}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', } })
            if (!res.ok) throw new Error("Something went wrong")
            dispatch({ type: 'selectedRecipe', payload: null })
        } catch (error: any) {
            console.log(error.message)
        } finally {
            dispatch({ type: "loadingSelected", payload: false })
        }
    }

    return (<RecipeContext.Provider value={{
        recipes, loadRecipes, dispatch, error, loading, loadSelectedRecipe, selectedRecipe, loadingSelected, errorSelected, bookmarkList, deleteSelectedRecipeFromAPI
    }}>{children}</RecipeContext.Provider>)
}

function useRecipe() {
    const context = useContext(RecipeContext)
    if (context === undefined) throw new Error("component is used outside of context provider")
    return context;
}

export { RecipeProvider, useRecipe }