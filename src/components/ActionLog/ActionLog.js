import './ActionLog.scss';

const ActionLog = ({ player1, player2, player1Position, player2Position }) => {
    return (
        <div className="action-log">
            <div className='action-log__header'>
                <h3 className='action-log__header--title'>Action Log</h3>
            </div>
            <ul className='action-log__list'>
                <li className='action-log__list--item'>{player1} moved for 1 AP</li>
                <li className='action-log__list--item'>{player1} listened for 1 AP</li>
                <li className='action-log__list--item'>{player2} shot from {player2Position} for 2 AP</li>
                <li className='action-log__list--item'>{player2} missed!</li>
                <li className='action-log__list--item'>{player1} shot from {player1Position} for 2 AP</li>
                <li className='action-log__list--item'>{player1} shot {player2}!</li>
            </ul>
        </div>
    )
}

export default ActionLog;