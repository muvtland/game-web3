import {Canvas} from "@react-three/fiber";
// import { EffectComposer, Pixelation } from "@react-three/postprocessing";
import useGame from "./stores/useGame.js";
import Game from "./Game.jsx";
import Interface from "./interface/Interface";
import Controls from "./utils/Controls";
//import Connect from "./connect/Connect.jsx";
import {ConnectSolana} from "./connect/ConnectSolana.jsx";

document.addEventListener("contextmenu", (e) => e.preventDefault());

export default function App() {
  const isInGame = useGame((state) => state.isInGame);

  return (
    <>
      {isInGame ? (
        <Controls>
          <Canvas
              shadows
              camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [2.5, 4, 6],
              }}
          >
            <Game/>
          </Canvas>
          <Interface/>
        </Controls>
      ) : (
          <ConnectSolana/>
      )}
    </>
  );
}
