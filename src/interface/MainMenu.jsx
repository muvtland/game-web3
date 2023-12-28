import {useEffect, useState} from "react";
import useGame from "../stores/useGame.js";
// import LogoBall from "../assets/logo_ball_stroke.svg";
import LogoBall from "../assets/logo-3.jpg";
import Wordmark from "../assets/wordmark.svg";
import Frog from "../assets/frog.png";
import MichaelLogo from "../assets/mm_white.svg";
import { getLocalStorage, setLocalStorage } from "../stores/utils.js";
import ImageSequence from "../ImageSequence/index.jsx";
import useUser from "../stores/useUser.js";
import {levelsObj} from "../stores/levels.js";

export default function MainMenu() {
  const { setBlocksCount, setDifficulty, setIsInGame } = useGame();
  const level = useUser((state) => state.level);
  const [isSettings, setIsSettings] = useState(false);

  useEffect(() => {
    const currentLevel = levelsObj[level];
    const difficulty = currentLevel?.difficulty || 1;
    const blocksCount = currentLevel?.blocksCount || 5;
    setDifficulty(difficulty);
    setBlocksCount(blocksCount);
  }, [level]);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      setIsInGame(true);
    }
  });
  return (
    <div className="main-menu">
      <img className="logo-ball" src={LogoBall} />
      <h2 className="main-menu-text">Cerb Coin</h2>
      <h2 className="main-menu-text">Game</h2>
      {/*<img className="wordmark" src={Wordmark} />*/}
      {/*<ImageSequence />*/}
      <div className="main-menu-button" onClick={() => setIsInGame(true)}>
        Play
      </div>

      {/*{!isSettings ? (*/}
      {/*  <div className="main-menu-button" onClick={() => setIsSettings(true)}>*/}
      {/*    Settings*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    <div className="main-menu-section-title">Mode</div>*/}
      {/*    <div className="main-menu-selection-area">*/}
      {/*      <div*/}
      {/*        className={`main-menu-selection ${*/}
      {/*          mode === "random" ? "main-menu-selected" : ""*/}
      {/*        }`}*/}
      {/*        onClick={() => setMode("random")}*/}
      {/*      >*/}
      {/*        Random*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className={`main-menu-selection ${*/}
      {/*          mode === "tour" ? "main-menu-selected" : ""*/}
      {/*        }`}*/}
      {/*        onClick={() => setMode("tour")}*/}
      {/*      >*/}
      {/*        Tour*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className={`main-menu-selection ${*/}
      {/*          mode === "adventure" ? "main-menu-selected" : ""*/}
      {/*        }`}*/}
      {/*        onClick={() => setMode("adventure")}*/}
      {/*      >*/}
      {/*        Adventure*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    {mode === "random" && (*/}
      {/*      <>*/}
      {/*        <div className="main-menu-section-title">Difficulty</div>*/}
      {/*        <div className="main-menu-selection-area">*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              parseInt(difficulty) === 1 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setDifficulty(1);*/}
      {/*              setLocalStorage("difficulty", 1);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Easy*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              parseInt(difficulty) === 3 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setDifficulty(3);*/}
      {/*              setLocalStorage("difficulty", 3);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Medium*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              parseInt(difficulty) === 5 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setDifficulty(5);*/}
      {/*              setLocalStorage("difficulty", 5);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Hard*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              parseInt(difficulty) === 10 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setDifficulty(10);*/}
      {/*              setLocalStorage("difficulty", 10);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Evil*/}
      {/*          </div>*/}
      {/*        </div>*/}

      {/*        <div className="main-menu-section-title">Number of Blocks</div>*/}
      {/*        <div className="main-menu-selection-area">*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection main-menu-selection-short ${*/}
      {/*              blocksCount === 5 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setBlocksCount(5);*/}
      {/*              setLocalStorage("blocksCount", 5);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            5*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection main-menu-selection-short ${*/}
      {/*              blocksCount === 10 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setBlocksCount(10);*/}
      {/*              setLocalStorage("blocksCount", 10);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            10*/}
      {/*          </div>*/}

      {/*          <div*/}
      {/*            className={`main-menu-selection main-menu-selection-short ${*/}
      {/*              blocksCount === 15 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setBlocksCount(15);*/}
      {/*              setLocalStorage("blocksCount", 15);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            15*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection main-menu-selection-short ${*/}
      {/*              blocksCount === 20 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setBlocksCount(20);*/}
      {/*              setLocalStorage("blocksCount", 20);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            20*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection main-menu-selection-short ${*/}
      {/*              blocksCount === 30 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setBlocksCount(30);*/}
      {/*              setLocalStorage("blocksCount", 30);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            30*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection main-menu-selection-short ${*/}
      {/*              blocksCount === 40 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setBlocksCount(40);*/}
      {/*              setLocalStorage("blocksCount", 40);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            40*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection main-menu-selection-short ${*/}
      {/*              blocksCount === 50 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setBlocksCount(50);*/}
      {/*              setLocalStorage("blocksCount", 50);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            50*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection main-menu-selection-short ${*/}
      {/*              blocksCount === 100 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setBlocksCount(100);*/}
      {/*              setLocalStorage("blocksCount", 100);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            100*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </>*/}
      {/*    )}*/}

      {/*    {mode === "tour" && (*/}
      {/*      <>*/}
      {/*        <div className="main-menu-section-title">Difficulty</div>*/}
      {/*        <div className="main-menu-selection-area">*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              parseInt(difficulty) === 1 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setDifficulty(1);*/}
      {/*              setLocalStorage("difficulty", 1);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Easy*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              parseInt(difficulty) === 3 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setDifficulty(3);*/}
      {/*              setLocalStorage("difficulty", 3);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Medium*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              parseInt(difficulty) === 5 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setDifficulty(5);*/}
      {/*              setLocalStorage("difficulty", 5);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Hard*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              parseInt(difficulty) === 10 ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setDifficulty(10);*/}
      {/*              setLocalStorage("difficulty", 10);*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Evil*/}
      {/*          </div>*/}
      {/*        </div>*/}

      {/*        <div className="main-menu-section-title">Beach</div>*/}
      {/*        <div className="main-menu-selection-area">*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              level === "copacabana" ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setLevel("copacabana");*/}
      {/*              setLocalStorage("level", "copacabana");*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Copacabana*/}
      {/*          </div>*/}
      {/*          <div*/}
      {/*            className={`main-menu-selection ${*/}
      {/*              level === "santamonica" ? "main-menu-selected" : ""*/}
      {/*            }`}*/}
      {/*            onClick={() => {*/}
      {/*              setLevel("santamonica");*/}
      {/*              setLocalStorage("level", "santamonica");*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            Santa Monica*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="coming-soon">More beaches coming soon!</div>*/}
      {/*      </>*/}
      {/*    )}*/}

      {/*    {mode === "adventure" && (*/}
      {/*      <div className="coming-soon">Coming soon!</div>*/}
      {/*    )}*/}
      {/*  </>*/}
      {/*)}*/}

      {/*<div className="main-menu-about-section">*/}
      {/*  <div className="main-menu-about">*/}
      {/*    <a href="https://github.com/michaelkolesidis/beachy-beachy-ball">*/}
      {/*      © 2023 Michael Kolesidis.*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*  <div className="main-menu-about">*/}
      {/*    {" "}*/}
      {/*    <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">*/}
      {/*      Licensed under the GNU AGPL 3.0*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<a href="https://michaelkolesidis.com" target="_blank">*/}
      {/*  <img*/}
      {/*    className="author-logo"*/}
      {/*    src={MichaelLogo}*/}
      {/*    alt="Author's logo"*/}
      {/*  ></img>*/}
      {/*</a>*/}
    </div>
  );
}
