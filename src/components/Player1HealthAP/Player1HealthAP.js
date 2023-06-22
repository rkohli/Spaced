import './Player1HealthAP.scss';

const Player1HealthAP = ({ player1 }) => {
    return (
        <div className="player__info">
            <div className="player__info--top">
                <h2 className="player__info--name">{player1}</h2>
                <h3 className="player__info--health">Health: 2</h3>
            </div>
            <div className="player__info--bottom">
                <h3 className="player__info--ap">AP: 2</h3>
            </div>
        </div>
    )
}

export default Player1HealthAP;