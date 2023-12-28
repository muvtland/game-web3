import { useKeyboardControls } from "@react-three/drei";
import {useCallback, useEffect, useRef, useState} from "react";
import { addEffect } from "@react-three/fiber";
import useGame from "../stores/useGame.js";
import useAudio from "../stores/useAudio.js";
// import Logo from "../assets/logo_white.svg";
import Logo from "../assets/logo-3.jpg";
import useUser from "../stores/useUser.js";
import {levelsObj} from "../stores/levels.js";

export default function Interface() {
  const time = useRef();
  const { mode, setMode, restart, phase, setIsInGame, setDifficulty, setBlocksCount, next } = useGame();
  const { audio, toggleAudio } = useAudio();
  const { updateLevel, level } = useUser();
  // const forward = useKeyboardControls((state) => state.forward);
  // const backward = useKeyboardControls((state) => state.backward);
  // const leftward = useKeyboardControls((state) => state.leftward);
  // const rightward = useKeyboardControls((state) => state.rightward);
  // const jump = useKeyboardControls((state) => state.jump);

  /**
   * Mode
   */
  const [modeName, setModeName] = useState(mode);

  useEffect(() => {
    switch (mode) {
      case "random":
        setModeName("Random");
        break;
      case "tour":
        setModeName("Tour");
        break;
      case "adventure":
        setModeName("Adventure");
        break;
    }
  }, [mode]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Restart game
      if (e.code === "Escape") {
        setIsModalOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, setIsModalOpen]);

  const clearData = () => {
    window.localStorage.clear();
  };

  const handleRestart = () => {
    restart();
  };

  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    setSelectedMode(modeOptions.find((m) => m.name === mode));
  }, []);

  function handleModeClick(mode) {
    setSelectedMode(mode);
  }

  const handleNextLevelClick =  useCallback(()=> {
    const currentLevel = levelsObj[level];
    const nextLevel = levelsObj[currentLevel.nextLevel];
    const difficulty = nextLevel?.difficulty || 1;
    const blocksCount = nextLevel?.blocksCount || 5;
    next(difficulty, blocksCount);
    updateLevel();
  }, [level])


  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  let modes = [
    { id: "0", text: "Random", name: "random" },
    { id: "1", text: "Tour", name: "tour" },
    { id: "2", text: "Adventure", name: "adventure" },
  ];

  const modeOptions = modes.map((mode) => (
    <div
      key={mode.id}
      className={`mode-selection ${
        selectedMode && selectedMode.name === mode.name ? "selected-mode" : ""
      }`}
      onClick={() => {
        handleModeClick(mode);
        setMode(`${mode.name}`);
        window.localStorage.setItem("mode", `"${mode.name}"`);
        handleRestart();
      }}
    >
      {mode.text}
    </div>
  ));

  return (
    <div className="interface">
      {/* Logo */}
      <img className="logo" src={Logo} alt="Cerb Coin Logo" />
      {/* Restart */}
      {phase === "ended" && (
          <div className="restart">
            <div className="finished">Finished!</div>
            <div className="restart-content">
              <div className="restart-button-block">
                <img
                    src="./icons/replay.png"
                    className="restart-button"
                    onClick={restart}
                />
                <div>Play Again</div>
              </div>
              <div className="restart-button-block">
                <img
                    src="./icons/replay.png"
                    className="restart-button"
                    onClick={handleNextLevelClick}
                />
                <div>Next Level</div>
              </div>
            </div>
          </div>
      )}
      {/* Control Buttons (top-right) */}
      <div className="control-buttons">
        <div className="control-button" id="sound" onClick={toggleAudio}>
          {audio ? (
              <img src="./icons/sound_on.svg"/>
          ) : (
              <img src="./icons/sound_off.svg"/>
          )}
        </div>
        {/*a*/}
      </div>
      {/* Bottom */}
      <div className="bottom">
        {/* Controls */}
        <div className="controls">
          {/* Mode */}
          <div className="bottom-label">{level.split('-')[1]}</div>
          <div className="mode">Level</div>
          {/* <div className="raw">
            <div className={`key ${forward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key ${leftward ? "active" : ""}`}></div>
            <div className={`key ${backward ? "active" : ""}`}></div>
            <div className={`key ${rightward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key large ${jump ? "active" : ""}`}></div>
          </div> */}
        </div>
        {/* Time */}
        <div className="bottom-right">
          <div className="time-container">
            <div className="bottom-label">Time</div>
            <div className="time" ref={time}></div>
            {/* <div className="mode">{mode}</div> */}
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Menu</div>

            <div className="modal-main">
              <div className="section-title">Mode</div>
              <div className="mode-area">{modeOptions}</div>
              {/*<div*/}
              {/*  className="modal-button disabled"*/}
              {/*  onClick={() => {*/}
              {/*    console.log("High Scores");*/}
              {/*  }}*/}
              {/*>*/}
              {/*  High Scores*/}
              {/*</div>*/}
              <div
                className="modal-button"
                onClick={() => {
                  clearData();
                }}
              >
                Clear Data
              </div>
              {/*<div*/}
              {/*  className="modal-button disabled"*/}
              {/*  onClick={() => {*/}
              {/*    console.log("Help");*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Help*/}
              {/*</div>*/}
              {/*<div*/}
              {/*  className="modal-button disabled"*/}
              {/*  onClick={() => {*/}
              {/*    console.log("Credits");*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Credits*/}
              {/*</div>*/}
              <div
                className="modal-button"
                onClick={() => {
                  setIsInGame(false);
                }}
              >
                Main Menu
              </div>
              <div
                className="modal-button"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Back
              </div>
            </div>
            {/*<div className="modal-about-area">*/}
            {/*  <div className="modal-about">*/}
            {/*    <a href="https://github.com/michaelkolesidis/beachy-beachy-ball">*/}
            {/*      © 2023 Michael Kolesidis.*/}
            {/*    </a>*/}
            {/*  </div>*/}
            {/*  <div className="modal-about">*/}
            {/*    <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">*/}
            {/*      Licensed under the GNU AGPL 3.0*/}
            {/*    </a>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      )}
    </div>
  );
}
