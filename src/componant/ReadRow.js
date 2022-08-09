import React from "react";

const ReadRow = ({ contact, handleEditClick, Delete }) => {
  return (
    <tr>
      <td>{contact.firstName}</td>
      <td>{contact.phoneNumber}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => Delete(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadRow;
