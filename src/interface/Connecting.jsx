import Logo from "../assets/cerb-logo.png";

export default function Connecting() {
    return (
        <div className="loading">
            <img className="loading-logo" src={Logo} alt="Cerb Coin Logo"/>
            <div className="loading-text">CONNECTING</div>
        </div>
    );
}
