import React, { useEffect, useState, Fragment } from 'react'
import data1 from './mydata.json'
import { nanoid } from "nanoid";
import ReadRow from './componant/ReadRow'
import EditRow from './componant/EditRow'

export default function FormData() {

    const [contacts,setContacts] = useState(data1)

    const [data,setData] = useState(
    { 
        firstName: '',
        phoneNumber: '',
    })

    const [editFormData, setEditFormData] = useState({
        fullName: "",
        phoneNumber: "",
      });
    
    const [editContactId, setEditContactId] = useState(null);
    const [formErrors,setFormErrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)

    const myData = (event)=>{
        event.preventDefault()
        const { name , value} = event.target
        const fiedName = event.target.getAttribute('name')
        const fieldValue = event.target.value
        const NewData = {...data,}
        NewData[fiedName] = fieldValue
        setData(NewData)
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
      };

      const handleSubmit = (event) =>{
        event.preventDefault()
          setFormErrors(validate(data))
          setIsSubmit(true)
      }

      useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit) {
          

        }
      },[formErrors])

    var  validate = (value) => {
        let errorMsg = {};
        
            if (!value.firstName){
              errorMsg = "Please enter name.";
            } 
            else if (
              !/^[a-zA-Z_ ]*$/.test(value))errorMsg = "Please enter valid name.";
          
  
            if (!value.phoneNumber){
              errorMsg = "Please enter phoneNumber.";
            } 
            else if (
                !/^[0-9]+$/.test(value))errorMsg = "Please enter valid phoneNumber.";
            
        
        return errorMsg;
      };

    const mySubmit = (event)=>{
        event.preventDefault()
        const newContact = {
            id: nanoid(),
            firstName:data.firstName,
            phoneNumber:data.phoneNumber
        }
        const newContacts = [...contacts,newContact]
        setContacts(newContacts)
    }

     

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContact = {
          id: editContactId,
          firstName: editFormData.fullName,
          phoneNumber: editFormData.phoneNumber,
        };
    
        const newContacts = [...contacts];
    
        const index = contacts.findIndex((contact) => contact.id === editContactId);
    
        newContacts[index] = editedContact;
    
        setContacts(newContacts);
        setEditContactId(null);
      };


      const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);
    
        const formValues = {
          firstName: contact.fullName,
          phoneNumber: contact.phoneNumber,

        };
    
        setEditFormData(formValues);
      };
    
      const handleCancelClick = () => {
        setEditContactId(null);
      };
      
    const Delete = (contactId) => {
        const newContacts = [...contacts];
        const index = contacts.findIndex((contact) => contact.id === contactId);
        newContacts.splice(index, 1);
        setContacts(newContacts);
      };

  return (
    <div>
        <form onSubmit={mySubmit} >

            <label>firstName</label>
            <input type="text" name='firstName' onChange={myData} />
            <p>{formErrors.firstName}</p>

            <label>phoneNumber</label>
            <input type="text" name='phoneNumber' onChange={myData} />
            <p>{formErrors.phoneNumber}</p>
            
            <input type="submit" value="Save"/>

        </form>
    <h2> Add contacts</h2>
    <div className='app-container'>
    <form onSubmit={handleEditFormSubmit}>

    <table>
        <thead>
        <tr>
            <th>NAME</th>
            <th>PHONE NUMBER</th>
        </tr>
        </thead>
        <tbody>
        {contacts.map((contact)=>

            <Fragment>
                {editContactId === contact.id ? (
                  <EditRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    Delete={Delete}
                  />
                )}
              </Fragment>
        )}
        
        </tbody>
    </table>

    </form>
    </div>
</div>
  )
}







