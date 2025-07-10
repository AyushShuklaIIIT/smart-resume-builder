import React from "react"
import Header from "./components/Header"
import MainContent from "./components/MainContent"
import { Provider } from "react-redux"
import { store } from "./store";

function App() {

  return (
    <Provider store={store}>
      <div className="bg-gray-50 min-h-screen">
        <Header></Header>
        <MainContent></MainContent>
      </div>
    </Provider>
  );
}

export default App;
