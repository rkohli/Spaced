import '../Player1HealthAP/Player1HealthAP.scss';
import './Player2HealthAP.scss';

const Player2HealthAP = ({ player2 }) => {

    return (
        <div className="player__info">
            <div className="player__info--top">
                <h2 className="player__info--name">{player2}</h2>
                <h3 className="player__info--health">Health: 2</h3>
            </div>
            <div className="player__info--bottom player2__info--bottom">
                <h3 className="player__info--ap">AP: 2</h3>
            </div>
        </div>
    )
}

export default Player2HealthAP;