# The 404 Server Manager

This is the new one

## install app

1. `yarn install`
2. if on server: `yarn build`

## .env

```
NEXT_PUBLIC_API_BASE_URL=http://0.0.0.0:3000
```

## getting Input without missing the last character

```js
  const getPassword = (enteredText) => {
    setPassword(enteredText.target.value);
    props.sendPasswordBackToParent(enteredText.target.value);
  };

    return (
    <div>
      <input
        onChange={getPassword}
      />
      <div>
    )
```

## Font

Requires NextJs 13 or heigher

1. next newsest `yarn add next@latest react@latest react-dom@latest`
2. `npx @next/codemod@latest built-in-next-font .` --- this YES!
3. install `npm i @next/font` --- maybe no?
4. pages/app.js

```js
import { JetBrains_Mono, Righteous } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  variable: "--font-righteous",
  weight: ["400"],
  display: "swap",
});

function App({ Component, pageProps }) {
  return (
    <div className={`${jetBrainsMono.variable} ${righteous.variable}`}>
      <Provider store={store}>// Rest of code</Provider>
    </div>
  );
}
```

5. to use in css, for example, globals.css:

```css
* {
  box-sizing: border-box;
  font-family: var(--font-jetbrains-mono), monospace;
}
```
