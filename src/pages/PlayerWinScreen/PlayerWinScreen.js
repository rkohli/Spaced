import './PlayerWinScreen.scss'

import Leaderboard from '../../components/Leaderboard/Leaderboard';

const PlayerWinScreen = () => {
    return (
        <div>
            <h3>Player 1 wins!</h3>
            <Leaderboard />
        </div>
    )
}

export default PlayerWinScreen;