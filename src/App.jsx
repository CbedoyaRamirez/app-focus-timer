import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./Timer/Timer";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(true);
  const [userActive, setUserActive] = useState(true);
  let inactivityTimer = null;

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    const resetInactivityTime = () => {
      clearTimeout(inactivityTimer);
      setUserActive(true);

      inactivityTimer = setTimeout(() => {
        setUserActive(false);
      }, 5000);
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("mousemove", resetInactivityTime);
    window.addEventListener("keydown", resetInactivityTime);
    window.addEventListener("click", resetInactivityTime);

    resetInactivityTime();

    return () => {
      window.addEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", resetInactivityTime);
      window.removeEventListener("keydown", resetInactivityTime);
      window.removeEventListener("click", resetInactivityTime);
      clearTimeout(inactivityTimer);
    };

    /*
    const handlePosition = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handlePosition);

    return () => {
      window.removeEventListener("mousemove", handlePosition);
    };
    */
  }, []);

  return (
    <div className="container">
      <Timer></Timer>
      {/* <h1>{userActive ? "usuario activo" : <Timer></Timer>}</h1> */}
    </div>
  );
}

export default App;
