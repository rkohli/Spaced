import './ActionLog.scss';

const ActionLog = ({ actionLog }) => {
    const reversedActionLog = [...actionLog].reverse();

    return (
        <div className="action-log">
            <div className='action-log__header'>
                <h3 className='action-log__header--title'>Action Log</h3>
            </div>
            <ul className='action-log__list'>
                {reversedActionLog.map((action, index) => (
                    <li key={index} className='action-log__list--item'>
                        {action}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActionLog;