import { useEffect, useState } from "react";
import HomePage from "./component/HomePage";
import AboutPage from "./component/AboutPage";
import ContactPage from "./component/ContactPage";

const NotFound = () => <h1>404 Not Found</h1>

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const handlePopstate = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  const navigate = (url: string) => {
    setPathname(url);
    history.pushState({},"", url);
  };

  let Page; 
  switch (pathname) {
    case "/":
    case "/home":
      Page = <HomePage />;
      break;
    case "/about":
      Page = <AboutPage />;
      break;
    case "/contact":
      Page = <ContactPage />
      break;
    default :
      Page = <NotFound /> 
  };

  console.log('rendering check');

  return (
    <>
    <div className="w-screen h-screen items-center flex flex-col"> 
      <nav className="justify-center m-10 border-10 border-gray-200 rounded-3xl bg-gray-200">
        <a href="/home" onClick={(e) => {
        e.preventDefault(); 
        navigate("/home");
        }} 
        className={`m-15 transition-colors 
          ${pathname === "/home" || pathname === "/" ? "font-bold" : ''}`}> 
        Home 
        </a> 

        <a href="/about" onClick={(e) => {
          e.preventDefault();
          navigate("/about");
          }}
          className={`m-15 transition-colors 
          ${pathname === "/about" ? "font-bold" : ''}`}> 
            About
        </a>

        <a href="/contact" onClick={(e) => {
          e.preventDefault();
          navigate("/contact")
        }}
        className={`m-15 transition-colors 
          ${pathname === "/contact" ? "font-bold" : ''}`}> 
          Contact
        </a>
      </nav>
      <main className="flex flex-col items-center w-3/4">{Page}</main>
    </div>
    </>
  );

}

export default App; 

