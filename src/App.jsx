import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import {FiSearch} from 'react-icons/fi'
import {AiFillPlusCircle} from 'react-icons/ai'
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import {db} from './config/firebase'
import {HiOutlineUserCircle} from 'react-icons/hi';
import {IoMdTrash} from 'react-icons/io';
import {RiEditCircleLine} from 'react-icons/ri';
import ContactCard from './components/contactCard'
import Modal from './components/Modal';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';


const App = () => {

  const [contact, setContacts] = useState([]);

  const {isOpen, onClose, onOpen} = useDisclouse();


  useEffect(() => {
    const getContacts =   async() =>{

      try {

        const contactsRef = collection(db, "contact");

        onSnapshot(contactsRef, (snapshot) =>{
          const contactLists = snapshot.docs.map((doc) => {
            return{
              id : doc.id,
              ...doc.data(),
          };
          });
          setContacts(contactLists);
          return contactLists;
        })



      } catch (error) {
        
      }

    };

    getContacts();
  },[])

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contact");

    onSnapshot(contactsRef, (snapshot) =>{
      const contactLists = snapshot.docs.map((doc) => {
        return{
          id : doc.id,
          ...doc.data(),
      };
      });

      const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))
      setContacts(filteredContacts);
      return filteredContacts;
    })


  }



  return (

    <>

    <div className=' px-3 mx-auto max-w-[500px] '>
    <Navbar/>
    <div className='flex gap-2  my-10 m-auto'>
    <div className='flex relative items-center'>
      <FiSearch className='ml-2 absolute text-white text-3xl ' />
      <input placeholder='Search' onChange={filterContacts} type='text' className='flex-grow border bg-transparent border-white rounded-md h-10 text-white pl-10 text-2xl'/>
    </div>
    <AiFillPlusCircle onClick={onOpen} className=' m-auto text-5xl cursor-pointer text-white'/>
    </div>

    <div className='mt-4 '>
      {contact.map((contact) =>(
        <ContactCard key={contact.id} contact= {contact}/>
      ))

      }
    </div>
   
    </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
      
    </>
  )
}

export default App
