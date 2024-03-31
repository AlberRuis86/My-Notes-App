import React, { useState, useEffect } from 'react';

const Body = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [showArchivedNotes, setShowArchivedNotes] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) => note.tags.includes(searchTag) && !note.archived)
    );
  }, [notes, searchTag]);

  const handleNoteContentChange = (event) => {
    setNewNoteContent(event.target.value);
  };

  const handleNoteEdit = (noteId) => {
    setEditingNoteId(noteId);
    const noteToEdit = notes.find((note) => note.id === noteId);
    if (noteToEdit) {
      setNewNoteContent(noteToEdit.content);
      setNewTag(noteToEdit.tags.join(' '));
    }
  };

  const handleNoteDelete = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleNoteArchive = (noteId) => {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, archived: true };
        }
        return note;
      })
    );
  };

  const handleNoteUnarchive = (noteId) => {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, archived: false };
        }
        return note;
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingNoteId !== null) {
      setNotes(
        notes.map((note) => {
          if (note.id === editingNoteId) {
            return {
              ...note,
              content: newNoteContent,
              tags: newTag.split(' '),
            };
          }
          return note;
        })
      );
      setEditingNoteId(null);
    } else {
      const newNote = {
        id: Date.now(),
        content: newNoteContent,
        archived: false,
        tags: newTag.split(' '),
      };
      setNotes([...notes, newNote]);
    }
    setNewNoteContent('');
    setNewTag('');
  };

  const removeTagFromNote = (noteId, tag) => {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, tags: note.tags.filter((t) => t !== tag) };
        }
        return note;
      })
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleSearchTagChange = (event) => {
    setSearchTag(event.target.value);
  };

  const handleFilterByTag = () => {
    setFilteredNotes(
      notes.filter((note) => note.tags.includes(searchTag) && !note.archived)
    );
  };

  const handleClearFilter = () => {
    setSearchTag('');
    setFilteredNotes([]);
  };

  const handleToggleArchivedNotes = () => {
    setShowArchivedNotes(!showArchivedNotes);
  };

  const activeNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <div className="container flex flex-grow text-center mx-auto mt-8 h-full">
      <div className="w-1/3 mx-2">
        <h2 className="text-2xl font-bold">Active Notes</h2>
        <div className="mt-4">
          {activeNotes.map((note) => (
            <div key={note.id} className="bg-white p-2 mb-2 rounded-md shadow-md">
              <p>{note.content}</p>
              <div className="flex flex-wrap mt-2">
                {note.tags &&
                  note.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {tag}
                      <button
                        className="ml-2"
                        onClick={() => removeTagFromNote(note.id, tag)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
              <button
                onClick={() => handleNoteEdit(note.id)}
                className="bg-green-500 text-white mx-2 my-2 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleNoteDelete(note.id)}
                className="bg-red-500 text-white mx-2 my-2 px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleNoteArchive(note.id)}
                className="bg-yellow-500 text-white mx-2 my-2 px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600"
              >
                Archive
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 mx-2">
        <h2 className="text-2xl font-bold">Notes</h2>
        <div className="h-full bg-gray-200 p-4 rounded-lg shadow-md" id="form">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-20 p-2 mb-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your note content..."
              value={newNoteContent}
              onChange={handleNoteContentChange}
              onKeyDown={handleKeyDown}
              required
            ></textarea>
            <div className="mt-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag (comma separated)..."
                className="border border-gray-400 px-2 py-1 rounded-md mr-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white mx-2 my-2 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              {editingNoteId ? 'Update Note' : 'Create Note'}
            </button>
            <div className="mt-2">
              <input
                type="text"
                value={searchTag}
                onChange={handleSearchTagChange}
                placeholder="Search by tag..."
                className="border border-gray-400 px-2 py-1 rounded-md mr-2"
              />
              <button
                type="button"
                onClick={handleFilterByTag}
                className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2"
              >
                Filter Tag
              </button>
              <button
                type="button"
                onClick={handleClearFilter}
                className="bg-gray-500 text-white px-4 py-1 rounded-md"
              >
                Clear
              </button>
            </div>
            <div className="mt-4">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-2 mb-2 rounded-md shadow-md"
                >
                  <p>{note.content}</p>
                  <div className="flex flex-wrap mt-2">
                    {note.tags &&
                      note.tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
                        >
                          {tag}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/3 mx-2">
        {showArchivedNotes && archivedNotes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold">Archived Notes</h2>
            <div className="mt-8">
              {archivedNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-2 mb-2 rounded-md shadow-md"
                >
                  <p>{note.content}</p>
                  <div className="flex flex-wrap mt-2">
                    {note.tags &&
                      note.tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
                        >
                          {tag}
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={() => handleNoteUnarchive(note.id)}
                    className="bg-blue-500 text-white mx-2 my-2 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Unarchive
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleToggleArchivedNotes}
          className="bg-gray-500 text-white mx-2 my-2 px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
        >
          {showArchivedNotes ? 'Hide Archived Notes' : 'Show Archived Notes'}
        </button>
      </div>
    </div>
  );
};

export default Body;
