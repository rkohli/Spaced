import '../Player1HealthAP/Player1HealthAP.scss';
import './Player2HealthAP.scss';

const Player2HealthAP = ({ player2, player2Health, player2AP }) => {

    return (
        <div className="player__info">
            <div className="player__info--top">
                <h2 className="player__info--name">{player2}</h2>
                <h3 className="player__info--health">Health: {player2Health}</h3>
            </div>
            <div className="player__info--bottom player2__info--bottom">
                <h3 className="player__info--ap">AP: {player2AP}</h3>
            </div>
        </div>
    )
}

export default Player2HealthAP;