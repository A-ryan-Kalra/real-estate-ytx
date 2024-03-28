import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import ScrollUp from "./components/ScrollUp";
import Search from "./pages/Search";
import About from "./pages/About";
import ErrorPage from "./components/ErrorPage";
import { useEffect, useState } from "react";
import { hideScrollbar, showScrollbar } from "./constants/scrollbar";
import { Tooltip } from "@nextui-org/react";
import PWAModal from "./components/PWAModal";
import { Icon } from "@iconify/react/dist/iconify.js";

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<any>(null);
  const [pwa, setPwa] = useState(false);
  const handleCLoseModal = () => {
    showScrollbar();
    setPwa(false);
    // setShowModal(false);
  };

  const handleInstall = () => {
    if (prompt) {
      prompt.prompt();

      prompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Accepted");
          showScrollbar();
          setShowModal(false);
          setPwa(false);
        } else {
          console.log("Cancelled");
          setShowModal(false);
          setPwa(false);
          showScrollbar();
        }
        setPrompt(null);
        setShowModal(false);
      });
    }
  };
  const showPwa = () => {
    hideScrollbar();
    setPwa(true);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setPrompt(event);
      if (!window.matchMedia("display-mode: standalone").matches) {
        setShowModal(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);
  return (
    <div className="relative">
      {showModal && (
        <Tooltip
          showArrow={true}
          content="Install App"
          color="primary"
          className="bg-blue-500 rounded-full text-white p-2"
        >
          <div
            onClick={showPwa}
            className="fixed bottom-20 cursor-pointer hover:shadow-slate-500 shadow-md duration-300 ease-in-out z-[100] bg-slate-400 py-3 px-3 right-10 rounded-full"
          >
            <Icon
              icon="tdesign:device"
              width={30}
              height={30}
              className="text-white "
            />
          </div>
        </Tooltip>
      )}
      {pwa && (
        <PWAModal
          onClose={handleCLoseModal}
          onInstall={handleInstall}
          show={showModal}
        />
      )}
      <ScrollUp />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
        </Route>
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
