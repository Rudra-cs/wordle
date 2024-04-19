<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Rudra-cs/wordle">
    <img src="./public/wordle.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">weather.io</h3>

  <p align="center">
    a wordle clone written in React, Typescript, Tailwind, and with tests using vitest!
    <br />
    <br />
    <a href="">View Demo</a>
    ·
    <a href="https://github.com/Rudra-cs/wordle/issues">Report Bug</a>
    ·
    <a href="https://github.com/Rudra-cs/wordle/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technologies">Technologies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![weather.io][product-screenshot]](https://github.com/Rudra-cs/wordle)

Welcome to the Wordle Game Application! 🎮

This project is your gateway to a fun and engaging game of Wordle, built using React.js, TypeScript, and Zustand for state management. With a sleek interface crafted using Tailwind CSS, you'll enjoy a seamless gaming experience while trying to guess the hidden word.

The Wordle Game Application integrates the Zustand library for state management, ensuring efficient handling of game states and user interactions. By utilizing React.js and TypeScript, we've created a robust and type-safe codebase, enhancing the reliability and maintainability of the application.

Get ready to challenge your word-guessing skills and embark on an exciting journey with Wordle! 🌟

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 📦 Technologies

-   `Vite`
-   `Vitest`
-   `React.js`
-   `TypeScript`
-   `Tailwind CSS`
-   `WebStorage API (Local Storage)`
-   `Zustand`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1. Clone the repo
    ```sh
    https://github.com/Rudra-cs/wordle.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Run the dev server
    ```sh
    npm run start
    ```
4. To run tests
    ```sh
    npm run test
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [x] Add Game Logic
-   [x] Add Minimal design
-   [x] Implemented state changes
-   [x] Add Winning Confetti
-   [ ] Add Flip Animation
-   [ ] Add Specific word game
-   [ ] Multi-language Support
    -   [ ] Hindi
    -   [ ] Spanish
    -   [ ] Japanese

See the [open issues](https://github.com/Rudra-cs/weather.io/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Steps

-   [Add tailwind](https://tailwindcss.com/docs/guides/vite)
-   Did some googling and seems adding Jest to Vite isn't easy
-   So using [vitest](https://vitest.dev/)
-   For our core algorithm working
    -   [Found a 5 letter word list to use](https://www.thefreedictionary.com/5-letter-words.htm)
        -   Hehe `copy(Array.from(document.querySelectorAll('.TCont li a')).map(a => a.innerText))`
    -   Got initial basic design and then realized i needed to go back to making the core algorithm work
-   Ok get `computeGuess()` working
-   Realizied i forgot some edge cases of `computerGuess` and had to fix them
-   Update props of WordRow and clean up styles somewhat
-   Let's get our store working! adding zustand and getting the UI to work accordingly
    -   At this point i wanted to get letter input working...so i just kept coding and coding
    -   Got the raw behavior working...but let's stop for now
-   Want to add validation to game (only allow 6 guesses) but think it may be easier to do this with UI tests
    -   So go to [vitest examples](https://vitest.dev/guide/#examples) which leads to [their react-testing-library example](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib) and then cross test that it's [the same as react testing libraries setup guide](https://testing-library.com/docs/react-testing-library/setup)
    -   Just went down a huge rabbit hole getting RTL working with vitest only to find that jest-dom TypeScript support is broken
-   More tests! getting more game functionality together
-   Spend way too long to get empty state of the game to have correct default height
-   Get things deployable for fun and profit
-   Refactor store to save computed guesses into store so we can calculate game state more easily
-   This took far too much time than it should have
    -   I wanted to move from input box to global keyDown listener
    -   I ran into the issue where a function handler closes over a value so the `guess` `useState` value was stale and never changed
-   Some minor refactoring to get isValidWord working. had to move state around
-   Add the keyboard for mobile use!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Support -->

## Support the Project

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/rudrabehera)

<!-- Links -->

[product-screenshot]: public/wordle-clone.jpg
