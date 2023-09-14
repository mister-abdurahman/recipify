import React from 'react';

function ErrorMsg({ message }: any) {
    return (
        <div className='text-center px-16 mt-16'>
            <p>⛔ {message}</p>
        </div>
    );
};

export default ErrorMsg;