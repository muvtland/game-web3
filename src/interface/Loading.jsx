import Logo from "../assets/cerb-logo.png";
import Ball from "../assets/ball.png";

export default function Loading({type}) {
  const text = type === "loading" ? "LOADING..." : "CONNECTING";
  return (
      <div className="loading">
          <img className="loading-logo" src={Logo} alt="Cerb Coin Logo"/>
          <div className="loading-middle">
              {type === "loading" && <img className="loading-ball" src={Ball} alt="ball"/>}
              <div className="loading-text">{text}</div>
          </div>
      </div>
  );
}
