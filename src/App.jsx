import React, { useEffect } from "react"
import Header from "./components/Header"
import MainContent from "./components/MainContent"
import { Provider, useDispatch } from "react-redux"
import { store } from "./store";
import AISuggestions from "./components/AISuggestions"
import Footer from "./components/Footer"
import { useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import { fetchResume } from './store/resumeThunks';

const AppContent = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken) {
      dispatch(fetchResume(getToken));
    }
  }, [getToken, dispatch]);

  return (
    <>
      <MainContent />
      <AISuggestions />
    </>
  );
};

function App() {

  return (
    <Provider store={store}>
      <div className="bg-gray-50 min-h-screen">
        <Header />

        <SignedIn>
          <AppContent />
        </SignedIn>

        <SignedOut>
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">Welcome to Smart Resume Builder</h2>
            <p className="text-gray-500 mt-2">Please sign in to create and manage your resumes.</p>
          </div>
        </SignedOut>
        
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
