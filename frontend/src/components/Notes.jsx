import React, { useEffect, useState } from 'react';
import { Navigate,useNavigate  } from "react-router-dom";
import api from '../api';
import CreateNote from './CreateNote';
import Note from './Note';
import Header from './Header';
import './notes.css';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");
    const [titleText, setTitleText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [editingNote, setEditingNote] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        getNotes();
    }, [searchQuery]); // Update the effect to depend on searchQuery

    const getNotes = () => {
        if (!searchQuery) {
            api
                .get("/api/notes/")
                .then((res) => res.data)
                .then((data) => {
                    setNotes(data);
                    console.log(data);
                })
                .catch((err) => alert(err));
        } else {
            searchNotes();
        }
    };

    const searchNotes = () => {
        api
            .get(`/api/notes/search/?search=${searchQuery}`)
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createOrUpdateNote = (e) => {
        e.preventDefault();
        const apiCall = editingNote
            ? api.put(`/api/notes/${editingNote.id}/`, { content: inputText, title: titleText })
            : api.post("/api/notes/", { content: inputText, title: titleText });

        apiCall
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    alert("Note saved!");
                    setTitleText("");
                    setInputText("");
                    getNotes();
                } else {
                    alert("Failed to save note.");
                }
                setEditingNote(null);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    };

    const startEditingNote = (note) => {
        console.log("Editing note:", note);
        setEditingNote(note);
        setTitleText(note.title);
        setInputText(note.content);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login"); // Redirect to login page
    };

    return (
        <>
            <Header handleSearch={(query) => setSearchQuery(query)} handleLogout={handleLogout} />
            <div className='notes'>
                {editingNote === null && (
                    <CreateNote
                        titleText={titleText}
                        setTitleText={setTitleText}
                        inputText={inputText}
                        setInputText={setInputText}
                        saveHandler={createOrUpdateNote}
                    />
                )}
                {notes.map((note) => (
                    editingNote && editingNote.id === note.id ? (
                        <CreateNote
                            key={note.id}
                            titleText={titleText}
                            setTitleText={setTitleText}
                            inputText={inputText}
                            setInputText={setInputText}
                            saveHandler={createOrUpdateNote}
                        />
                    ) : (
                        <Note
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            text={note.content}
                            editHandler={() => startEditingNote(note)}
                            deleteHandler={() => deleteNote(note.id)}
                        />
                    )
                ))}
            </div>
        </>
    );
};

export default Notes;
