import './SwitchPlayer.scss';

const SwitchPlayer = ({ opposingPlayerName, onBack, onNext }) => {
    return (
        <div className='switch'>
            <h2 className='switch__text'>Please pass to {opposingPlayerName} and don't look!</h2>
            <h3 className='switch__text'>{opposingPlayerName} please click Next to take your turn</h3>
            <button className='back__button' onClick={onBack}>Back</button>
            <button className='switch__button' onClick={onNext}>Next</button>
        </div>
    )
}

export default SwitchPlayer;