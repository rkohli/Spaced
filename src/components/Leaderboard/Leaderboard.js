import './Leaderboard.scss';

const Leaderboard = () => {
    return (
        <div className='leaderboard'>
            <h2 className='leaderboard__title'>Leaderboard</h2>
            <ul className='leaderboard__list'>
                <li className='leaderboard__list--item'>
                    <h4 className='leaderboard__list--item--text'>Username1</h4>
                    <h4 className='leaderboard__list--item--text'># of wins</h4>
                </li>
                <li className='leaderboard__list--item'>
                    <h4 className='leaderboard__list--item--text'>Username2</h4>
                    <h4 className='leaderboard__list--item--text'># of wins</h4>
                </li>
                <li className='leaderboard__list--item'>
                    <h4 className='leaderboard__list--item--text'>Username3</h4>
                    <h4 className='leaderboard__list--item--text'># of wins</h4>
                </li>
            </ul>
        </div>
    )
}

export default Leaderboard;