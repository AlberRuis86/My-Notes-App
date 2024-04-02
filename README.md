# My App Note - Frontend

## Description
This is the frontend part of My App Note, a simple web application for taking, tagging, and filtering notes. It allows users to create, edit, delete, archive/unarchive notes, and filter them by tags.

## Installation
1. Clone this repository.
2. Navigate to the frontend directory.
3. Run `npm install` to install dependencies.
4. After installation, run `npm run dev` to start the development server.
5. Open your browser and navigate to http://localhost:3000 to view the application.

**Note:** The development server might run on a different port (e.g., 5173) depending on your environment. If this is the case, you can find the correct port in the terminal output after running the development server. Make sure you have Node.js installed on your machine.

## Usage
- **Creating Notes:** Enter your note content in the textarea and optionally add tags separated by commas. Click the "Create Note" button.
- **Editing Notes:** Click the "Edit" button on a note to modify its content or tags.
- **Deleting Notes:** Click the "Delete" button on a note to remove it from the list.
- **Archiving Notes:** Click the "Archive" button on a note to move it to the archived notes section.
- **Filtering by Tag:** Enter a tag in the search input field and click "Filter Tag" to filter notes by the entered tag. Click "Clear" to clear the filter.

## Versions
- Node: 18.18.0
- NPM: 9.8.1
- Vite: 5.2.7
- React: 18.2.0
- TailwindCss: 3.4.3

# Notes Application Backend

This project is the backend of a notes application that allows you to create, edit, delete, archive and unarchive notes, as well as add and remove tags from notes and filter notes by tags.

## Technologies Used

- NestJS (v10.0.0)
- TypeORM (v0.3.20)
- PostgreSQL (pg v8.11.4)

## Installation

To install the project dependencies, run the following command:

bash
npm install

## Execution

To start the application, run the following command:

npm run start

The application will start on port 3000.

## API

The application exposes a REST API with the following routes:

GET /notes: Returns all notes.
GET /notes/:id: Returns the note with the specified ID.
GET /notes/filtered: Returns the notes filtered by the specified tags.
POST /notes: Creates a new note with the specified title and content.
POST /notes/:id/tags: Adds a tag to the note with the specified ID.
PATCH /notes/:id: Updates the note with the specified ID.
DELETE /notes/:id: Deletes the note with the specified ID.
DELETE /notes/:id/tags/:tag: Removes the specified tag from the note with the specified ID.

## API Documentation
The API documentation is available at the /api route when the application is running.
