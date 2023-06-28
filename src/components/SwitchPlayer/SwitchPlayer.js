import './SwitchPlayer.scss';

const SwitchPlayer = ({ opposingPlayerName, onBack, onNext }) => {
    return (
        <div className='switch'>
            <h2 className='switch__text'>Pass to {opposingPlayerName}!</h2>
            <h3 className='switch__subtext'>{opposingPlayerName}, click Next to take your turn</h3>
            <div className='buttons'>
                <button className='back__button' onClick={onBack}>Back</button>
                <button className='switch__button' onClick={onNext}>Next</button>
            </div>
        </div>
    )
}

export default SwitchPlayer;