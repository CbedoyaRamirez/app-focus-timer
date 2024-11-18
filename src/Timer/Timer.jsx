import { useEffect, useRef, useState } from "react";
import "./Timer.css";

function Timer() {
  const [timer, setTimer] = useState(5 * 60);
  const [progress, setProgress] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const offsetX = e.clientX - modalPosition.x;
    const offsetY = e.clientY - modalPosition.y;

    const handleMouseMove = (moveEvent) => {
      if (isDragging) {
        setModalPosition({
          x: moveEvent.clientX - offsetX,
          y: moveEvent.clientY - offsetY,
        });
      }
    };

    // Detener el movimiento cuando el ratón se suelta
    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prevtime) => prevtime - 1);
      setProgress((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      ref={modalRef}
      onMouseDown={handleMouseDown}
      style={{
        left: `${modalPosition.x}px`,
        top: `${modalPosition.y}px`,
        zIndex: 1000,
        position: "absolute",
        width: "350px",
        height: "150px",
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        justifyContent: "center",
        borderRadius: "10px",
        border: "1px solid #000",
        backgroundColor:"aliceblue"
      }}
    >
      <h1>Tiempo restante</h1>
      <p>{timer > 0 ? formatTime(timer) : "tiempo terminado"}</p>
      <progress max={timer} value={progress}></progress>
    </div>
  );
}

export default Timer;
