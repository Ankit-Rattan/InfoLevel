import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import {HiOutlineUserCircle} from 'react-icons/hi';
import {IoMdTrash} from 'react-icons/io';
import {RiEditCircleLine} from 'react-icons/ri';
import { db } from '../config/firebase';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclouse from '../hooks/useDisclouse';


const contactCard = ({contact}) => {
    const { onClose, onOpen, isOpen} = useDisclouse();
  

    const deleteContact = async(id) => {
        try {
                await deleteDoc(doc(db, "contact",id));
        } catch (error) {
            console.log(error)
        }
    }


  return (
 <>
    <div>
 <div key = {contact.id} className='bg-amber-50 flex justify-between items-center px-2 rounded-lg my-3' >
    

<div className='flex gap-2'>
  <HiOutlineUserCircle className='text-blue-950 text-4xl'/>
  <div className='text-black'>
    <h2 className='text-lg font-medium'>{contact.name}</h2>
    <p className='text-m'>{contact.email}</p>
  </div>
</div>
  <div className='flex text-3xl gap-1' >
    <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
    <IoMdTrash onClick={() => deleteContact(contact.id)} className='text-red-700 cursor-pointer'/>
  </div>
</div>
  
    </div>

    <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
 </>
  )
}

export default contactCard
