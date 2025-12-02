# VexilloBuild

**VexilloBuild** is an interactive React application that challenges players to reconstruct flags from around the world. By selecting the correct patterns, colors, overlays, and symbols, you learn about vexillology while testing your memory and attention to detail.

## Features

-   **Interactive Flag Builder:** Construct flags layer by layer using an SVG-based rendering engine.
-   **Multiple Levels:** Progress through levels of increasing difficulty, from simple tricolors to complex designs with multiple symbols.
-   **Validation System:** Get instant feedback on your flag's accuracy, including patterns, colors, and symbol placement.
-   **Hints & History:** Learn interesting facts and get hints about each flag's design.
-   **Responsive Design:** Built with Tailwind CSS for a modern, accessible interface.

## Tech Stack

-   **React 19**
-   **Tailwind CSS**
-   **Lucide React** (Icons)
-   **Jest** (Testing)

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the application:**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Testing

This project uses snapshot tests to ensure the flag rendering logic remains consistent.

### Running Tests

```bash
npm test
```

### Snapshot Tests

Tests are defined in `src/flags.test.js`. They verify that the `FlagPreview` component renders each flag correctly according to its configuration.

-   If you make intentional changes to the flag rendering logic or the flag definitions, the snapshots might fail.
-   To update the snapshots, run:
    ```bash
    npm test -- -u
    ```

## Project Structure

-   `src/App.js`: Main application logic, state management, and UI components.
-   `src/flags.js`: Configuration file defining all flag levels, including their shapes, colors, and construction rules.
-   `src/flags.test.js`: Snapshot tests for flag rendering.
-   `src/index.js`: Entry point.
