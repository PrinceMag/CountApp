import React from 'react'

const Note = ({ id, title,text, editHandler, deleteHandler }) => {
  return (
    <div className='note'>
      <div className='note-title'>{title}</div>
      <div className='note-body'>{text}</div>
      <div className='note_footer' style={{ justifyContent: "flex-end" }}>
        <button className='note_save' onClick={() => deleteHandler(id)}>Delete</button> &nbsp;
        <button className='note_save' onClick={() => editHandler(id, text)}>Edit</button>
      </div>
    </div>
  )
}

export default Note