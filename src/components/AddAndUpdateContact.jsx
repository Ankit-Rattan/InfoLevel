import React from 'react'
import Modal from './Modal'
import {ErrorMessage, Field, Form ,Formik } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import {db} from '../config/firebase'  
import * as Yup from 'yup';

// Yup is used for blocking invalid data to submit, like empty data, etc.

const contactSchemaValidation =  Yup.object().shape({
    name: Yup.string().required("Name NOT Valid"),
    email: Yup.string().email("Invalid email").required("E-Mail is NOT Valid")
})

const AddAndUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {

    const addContact = async(contact) =>{
        try {
            
            const contactRef = collection(db,"contact");
            await addDoc(contactRef,contact);
            onClose();
        } catch (error) {
            
        }
    }
    const updateContact = async(contact, id) =>{
        try {
            
            const contactRef = doc(db,"contact",id);
            await updateDoc(contactRef,contact);
            onClose();
        } catch (error) {
            
        }
    }

  return (
    <div>
    <Modal isOpen={isOpen} onClose = {onClose}>
        <Formik
        // Formic supports Yup Schema 
        validationSchema={contactSchemaValidation}
        initialValues={ isUpdate ? 
            {   
            name:contact.name,
            email:contact.email

            }:
            {
            name:"",
            email:""
        }}
        onSubmit={(values) =>{
            // console.log(values)
            isUpdate? updateContact(values, contact.id) : addContact(values);

        }}
        >
            <Form className='flex flex-col px-2'>
                <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name</label>
                <Field name = "name" className='h-10 border m-1 rounded-md'/>
                <div className=''>
                    <ErrorMessage name = "name"/>
                </div>
                </div>
                <div className='flex flex-col gap-1'>
                <label htmlFor='email'>E-mail</label>
                <Field type = "email" name = "email" className='h-10 border m-1 rounded-md'/>
                </div>

              <button type='submit' className='mx-1 my-2 bg-orange p-2 rounded-lg shadow-md'> {isUpdate ? "Update" : "Add"} Contact</button>  
            </Form>
        </Formik>
    </Modal>
    </div>
  )
}

export default AddAndUpdateContact
