import React from 'react';
import { selectedRecipeType, useRecipe } from '../contexts/recipeContext';
import { EachRecipeResult } from './EachRecipe';

function BookmarkList() {
    // const bookmarked = JSON.parse(localStorage.getItem('recipes')!)
    const { bookmarkList } = useRecipe()

    return (
        <div className='w-[30rem]'>
            {bookmarkList ? bookmarkList.map((el: selectedRecipeType) => <EachRecipeResult publisher={el.publisher} image_url={el.image_url} id={el.id} title={el.title} />) : <p>Bookmark a recipe to add to bookmarked list 🤞</p>}
        </div>
    );
};

export default BookmarkList;