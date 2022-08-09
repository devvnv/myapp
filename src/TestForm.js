import React, { useEffect, useState, Fragment } from 'react'
import data1 from './mydata.json'
import ReadRow from './componant/ReadRow'


export default function FormData() {

    const [contacts,setContacts] = useState(data1)

    const [data,setData] = useState(
    { 
        firstName: '',
        phoneNumber: '',
    })

    const myData = (event)=>{
        event.preventDefault()
        const fiedName = event.target.getAttribute('name')
        const fieldValue = event.target.value
        const NewData = {...data,}
        NewData[fiedName] = fieldValue
        setData(NewData)
    }

    const mySubmit = (event)=>{
        event.preventDefault()
        const newContact = {
          
            firstName:data.firstName,
            phoneNumber:data.phoneNumber
        }
        const newContacts = [...contacts,newContact]
        setContacts(newContacts)
    }
      
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
       

            <label>phoneNumber</label>
            <input type="text" name='phoneNumber' onChange={myData} />

            
            <input type="submit" value="Save"/>

        </form>
    <h2> Add contacts</h2>
    <div className='app-container'>
    <form>

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
                 (
                  <ReadRow
                    contact={contact}
                    Delete={Delete}
                  />
                )
              </Fragment>
        )}
        
        </tbody>
    </table>

    </form>
    </div>
</div>
  )
}







