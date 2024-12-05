import "../styles/globals.css";
import Head from "next/head";
import { JetBrains_Mono } from "next/font/google";

import { Provider } from "react-redux";
import user from "../reducers/user";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ user });

const persistConfig = { key: "The404Manager", storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);
// Import the font
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

function App({ Component, pageProps }) {
  return (
    <div className={`${jetBrainsMono.variable} `}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>The 404</title>
            <meta name="The 404" content="The 404 Manager by dash and data." />
          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
