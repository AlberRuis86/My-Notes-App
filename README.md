**My App Note - Frontend**
*Description*
This is the frontend part of My App Note, a simple web application for taking, tagging, and filtering notes. It allows users to create, edit, delete, archive/unarchive notes, and filter them by tags.
*Installation*
1. Clone this repository.
2. Navigate to the frontend directory.
3. Run npm install to install dependencies.
4. After installation, run npm run dev to start the development server.
5. Open your browser and navigate to http://localhost:3000 to view the application.
*Note*
The development server might run on a different port (e.g., 5173) depending on your environment. If this is the case, you can find the correct port in the terminal output after running the development server.
Make sure you have Node.js installed on your machine.
*Usage*
Creating Notes: Enter your note content in the textarea and optionally add tags separated by commas. Click the "Create Note" button.
Editing Notes: Click the "Edit" button on a note to modify its content or tags.
Deleting Notes: Click the "Delete" button on a note to remove it from the list.
Archiving Notes: Click the "Archive" button on a note to move it to the archived notes section.
Filtering by Tag: Enter a tag in the search input field and click "Filter Tag" to filter notes by the entered tag. Click "Clear" to clear the filter.
*Versions*
Node: 18.18.0
NPM: 9.8.1
Vite: 5.2.7
React: 18.2.0
TailwindCss: 3.4.3
*Project Structure*
RUIS-50FEFA/
├── backend/
│   └── (empty for now)
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Body.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Header.jsx
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── main.jsx
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js
├── CHALLENGE.md
