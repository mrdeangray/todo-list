import React from "react";

const Header = () => (
  <header className="w-full bg-blue-600 text-white shadow-md">
    <nav className="container mx-auto flex items-center justify-between py-3 px-4">
      <div className="text-lg font-bold tracking-wide">Todo List</div>
      <ul className="flex space-x-6">
                <li>
          <a
            href="https://mrdeangray.github.io/geometry-trainer/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-yellow-300 transition-colors"
          >
            Geometry Trainer
          </a>
        </li>
        <li>
          <a
            href="https://geometry-trainer.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-yellow-300 transition-colors"
          >
            Geometry Trainer2
          </a>
        </li>

        <li>
          <a
            href="https://mrdeangray.github.io/contador-de-repeticiones/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-yellow-300 transition-colors"
          >
            Spanish
          </a>
        </li>
        <li>
          <a
            href="https://mrdeangray.github.io/chord-progression-builder/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-yellow-300 transition-colors"
          >
            Chord Progression
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
