# Keeper - Note Taking App

A modern, interactive note-taking application built with React and Material-UI. Keeper allows you to quickly create, view, and manage your notes with a clean and intuitive interface.

## Features

- ✨ **Create Notes**: Add notes with titles and content
- 🗑️ **Delete Notes**: Remove notes you no longer need
- 🎨 **Material-UI Design**: Beautiful, modern interface using Material-UI components
- 📱 **Responsive**: Works seamlessly across different screen sizes
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds
- 🎯 **Expandable Input**: Note creation area expands when clicked for better UX

## Tech Stack

- **React** 19.2.0 - UI library
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
  - @mui/material
  - @mui/icons-material
  - @emotion/react & @emotion/styled

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/patelkev/keeper.git
cd keeper
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
keeper/
├── public/
│   └── note-icon.svg
├── src/
│   ├── components/
│   │   ├── CreateArea.jsx    # Note creation form
│   │   ├── Header.jsx        # App header
│   │   ├── Note.jsx          # Individual note component
│   │   └── Footer.jsx        # App footer
│   ├── styles/
│   │   └── index.css         # Global styles
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Entry point
├── package.json
└── vite.config.js
```

## Usage

1. **Creating a Note**: 
   - Click on the "Take a note..." textarea
   - The input area will expand
   - Enter a title (optional) and content
   - Click the "+" button to add the note

2. **Deleting a Note**:
   - Click the delete button on any note card to remove it

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Author

Kevin Patel

---

Built with ❤️ using React and Material-UI
