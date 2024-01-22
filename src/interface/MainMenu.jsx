import {useEffect} from "react";
import useGame from "../stores/useGame.js";
import Logo from "../assets/cerb-logo.png";
import Podium from "../assets/podium.png";
import Ball from "../assets/ball.png";
import useUser from "../stores/useUser.js";
import {levelsObj} from "../stores/levels.js";

export default function MainMenu() {
  const { setBlocksCount, setDifficulty, setIsInGame } = useGame();
  const level = useUser((state) => state.level);

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
      <img className="logo-main-menu" src={Logo} alt="cerb-coin" />
      <p className="main-menu-button" onClick={() => setIsInGame(true)}>
        Play
      </p>
        <img className="podium-ball" src={Ball} alt="ball" />
        <img className="podium" src={Podium} alt="podium" />
    </div>
  );
}
