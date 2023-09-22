
import svg from '../assets/icons.svg';

function Loader() {
    return (
        <div className='flex justify-center items-center mt-20'>
            <svg className='animate-spin w-36 aspect-square'><use href={`${svg}#icon-loader`}></use></svg>
        </div>
    );
};

export default Loader;
