
type LeaderboardProps = {
    leaderboard: { address: string, score: number; }[];
};
export function LeaderboardWidget({ leaderboard }: LeaderboardProps) {
    return (
        <div>
            <h2>Leaderboard</h2>
            {
                leaderboard.length === 0 ?
                    <p>No one is on the leaderboard yet</p>
                    :
                    <ul>
                        {leaderboard.map((entry, index) => (
                            <li key={index}>
                                Address: {entry.address}, Score: {entry.score}
                            </li>
                        ))}
                    </ul>
            }
        </div>
    );
};
