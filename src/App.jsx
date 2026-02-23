import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./context/AuthContext";
import { api } from "./utils/api";
import './styles/index.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Fetch notes when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    } else {
      setNotes([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const fetchedNotes = await api.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      if (error.message.includes('Unauthorized')) {
        // Token expired or invalid, logout will be handled by auth context
      }
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (newNote) => {
    try {
      const createdNote = await api.createNote(newNote);
      setNotes(prevNotes => [createdNote, ...prevNotes]);
    } catch (error) {
      console.error('Error creating note:', error);
      alert(error.message || 'Failed to create note');
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await api.deleteNote(noteId);
      setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      alert(error.message || 'Failed to delete note');
    }
  };

  // Show loading state
  if (authLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        {showRegister ? (
          <Register onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login onSwitchToRegister={() => setShowRegister(true)} />
        )}
        <Footer />
      </div>
    );
  }

  // Show main app if authenticated
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading notes...</p>
        </div>
      ) : (
        <div className="notes-container">
          {notes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>No notes yet. Create your first note above!</p>
            </div>
          ) : (
            notes.map((noteItem) => {
              return (
                <Note
                  key={noteItem._id}
                  id={noteItem._id}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={deleteNote}
                />
              );
            })
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
