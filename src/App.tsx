import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";

type initialLocationState = {
  latitude: unknown;
  longitude: unknown;
  speed: unknown;
};

const initialLocationState: initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null,
};

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [{ latitude, longitude, speed }, setLocation] = useState(
    initialLocationState
  );

  let mounted = true;

  useEffect(() => {
    document.title = `You have clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);
    navigator.geolocation.getCurrentPosition(handleGeoLocation);
    const watchId = navigator.geolocation.watchPosition(handleGeoLocation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      navigator.geolocation.clearWatch(watchId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mounted = false;
    };
  }, [count, mousePosition]);

  const handleGeoLocation = (event: {
    coords: { latitude: unknown; longitude: unknown; speed: unknown };
  }) => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
      });
    }
  };

  const handleMouseMove = (event: { pageX: any; pageY: any }) => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY,
    });
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const toggleLight = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  return (
    <div className="App">
      <h2>Counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>
      <h2>Toggle Light</h2>
      <img
        src={
          isOn
            ? "https://icon.now.sh/highlight/fd0"
            : "https://icon.now.sh/highlight/aaa"
        }
        style={{
          height: "50px",
          width: "50px",
        }}
        alt="Flashlight"
        onClick={toggleLight}
      />
      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />
      <h2>Geo Location</h2>
      <p>Latitude is {latitude}</p>
      <p>Longitude is {longitude}</p>
      <p>Your speed is {speed ? speed : 0}</p>

      <Login />
    </div>
  );
};

export default App;
