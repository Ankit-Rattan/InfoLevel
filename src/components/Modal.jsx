import React, { Children } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function Modal({ onClose, isOpen, children }) {
    return (
        <>{isOpen && (
            <>
                <div className='m-auto z-50 relative min-h-[200px] w-[300px] bg-white'>

                    <div className='flex justify-end p-4'>
                        <AiOutlineClose onClick={onClose} className='text-2xl cursor-pointer' />
                    </div>
                    {children}
                </div>
                <div onClick={onClose} className=' backdrop-blur h-screen w-screen absolute top-0 z-40' />
            </>
            )}
            </>

    );
}

export default Modal
