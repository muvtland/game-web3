import React, { useCallback, useEffect, useRef, useState } from "react";
import { addEffect } from "@react-three/fiber";
import useGame from "../stores/useGame.js";
import useAudio from "../stores/useAudio.js";
import Logo from "../assets/cerb-logo.png";
import useUser from "../stores/useUser.js";
import { levelsObj } from "../stores/levels.js";
import ImageSequence from "../ImageSequence/index.jsx";

export default function Interface() {
  const time = useRef();
  const { mode, setMode, restart, phase, setIsInGame, setDifficulty, setBlocksCount, next } = useGame();

  const { audio, toggleAudio } = useAudio();
  const { updateLevel, level } = useUser();

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
    <div className={`interface`}>
      <ImageSequence />

      {/* Logo */}
      <img className="logo" src={Logo} alt="Cerb Coin Logo" />
      {/* Restart */}
      {phase === "ended" && (
          <div className="restart">
            <div>
              {/*<div className="finished">Finished!</div>*/}
              <div className="restart-content">
                <div className="finished">Finished!</div>
                <div className="buttons-block">
                  <div className="restart-button-block">
                    <img
                        src="./icons/return.png"
                        className="restart-button"
                        onClick={restart}
                    />
                    <div>Play Again</div>
                  </div>
                  <div className="restart-button-block">
                    <img
                        src="./icons/next.png"
                        className="next-button"
                        onClick={handleNextLevelClick}
                    />
                    <div>Next Level</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
      )}
      {/* Control Buttons (top-right) */}
      <div className="control-buttons">
        <div className="top-control-wrapper">
          <div className="control-button" id="sound" onClick={() => setIsModalOpen(true)}>
            <img src="./icons/close.svg"/>
          </div>
          <div className="control-button" id="sound" onClick={toggleAudio}>
            {audio ? (
                <img src="./icons/sound.svg"/>
            ) : (
                <img src="./icons/no-sound.svg"/>
            )}
          </div>
        </div>
        {/*a*/}
      </div>
      {/* Bottom */}
      <div className="bottom">
        {/* Controls */}
        <div className="controls">
          {/* Mode */}
          <div className="level-container">
            <div className="mode">Level</div>
            {/*<div className="bottom-label">{level.split('-')[1]}</div>*/}
            <div className="bottom-label">{level ? level.split('-')[1] : ''}</div>
          </div>
        </div>
        {/* Time */}
        <div className="bottom-right">
          <div className="time-container">
            <div className="bottom-label">Time</div>
            <div className="time" ref={time}></div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Menu</div>

            <div className="modal-main">
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
          </div>
        </div>
      )}
    </div>
  );
}
