import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const searchNotes = (e) => {
        e.preventDefault();
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
            ? api.put(`/api/notes/${editingNote.id}/`, { content, title })
            : api.post("/api/notes/", { content, title });

        apiCall
            .then((res) => {
                if (res.status === 200 || res.status === 201) alert("Note saved!");
                else alert("Failed to save note.");
                setEditingNote(null);
                setTitle("");
                setContent("");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    const startEditingNote = (note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                <form onSubmit={searchNotes}>
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} onEdit={startEditingNote} key={note.id} />
                ))}
            </div>
            <h2>{editingNote ? "Edit Note" : "Create a Note"}</h2>
            <form onSubmit={createOrUpdateNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
