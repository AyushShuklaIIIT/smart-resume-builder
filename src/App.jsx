import React from "react"
import Header from "./components/Header"
import MainContent from "./components/MainContent"
import { Provider } from "react-redux"
import { store } from "./store";
import AISuggestions from "./components/AISuggestions"
import Footer from "./components/Footer"

function App() {

  return (
    <Provider store={store}>
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <MainContent />
        <AISuggestions />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
