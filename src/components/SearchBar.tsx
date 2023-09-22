import { useState } from 'react';
import logo from '../assets/favicon.png';
import svg from '../assets/icons.svg';
import { useRecipe } from '../contexts/recipeContext';
import BookmarkList from './BookmarkList';

export function SearchBar({ setOpen }: any) {
    const [query, setQuery] = useState('')
    const { loadRecipes } = useRecipe()

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        loadRecipes && loadRecipes(query)
    }

    return <div className="search-bar relative flex flex-wrap justify-between items-center pl-12 bg-slate-50">
        <div className='flex items-center gap-3'>
            <figure className="md:h-[5rem] md:w-[5rem] h-[3rem] w-[3rem]">
                <img src={logo} alt="search icon" className='w-full h-full' />
            </figure>
            <h4 className='font-secondary md:text-5xl text-3xl font-bold'>Recipify</h4>
        </div>
        <form action="" className='flex sm:p-0 relative sm:order-none order-last m-auto focus-within:-translate-y-[2px] md:p-0 p-8 transition-all duration-500'>
            <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Search over 1,000,000 recipes' className='md:p-6 p-3 rounded-full md:w-[30vw] outline-none md:text-base text-[1.3rem]' />
            <button onClick={handleSearch} className='bg-gradient-to-br from-yellow-200 to-red-500 text-white flex items-center gap-4 uppercase lg:text-2xl md:text-md text-[1rem] lg:py-4 lg:px-16 py-1 px-6 -ml-12 lg:-ml-32 rounded-full hover:scale-[1.05] transition duration-500'><svg className='lg:w-10 lg:h-10 sm:w-8 sm:h-8 w-5 h-5'><use href={`${svg}#icon-search`}></use></svg> Search</button>
            <span className='sm:hidden text-xs absolute bottom-0 left-20'>Search over 1,000,000 recipes</span>
        </form>
        <nav className='flex list-none self-stretch'>
            <li onClick={() => setOpen(true)} className='flex md:text-base text-[1rem] items-center p-4 uppercase h-full hover:bg-gray-200'> <svg className='w-10 h-10'><use href={`${svg}#icon-edit`}></use></svg> Add recipe</li>
            <div className='group'>
                <li className='flex md:text-base text-[1rem] items-center p-4 uppercase h-full hover:bg-gray-200'> <svg className='w-10 h-10'><use href={`${svg}#icon-bookmark`}></use></svg> Bookmarks</li>
                <div className='bg-white hidden absolute z-10 top-42 right-0 group-hover:block'>
                    <BookmarkList />
                </div>
            </div>
        </nav>
    </div>
}
