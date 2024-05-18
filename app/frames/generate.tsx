import { Leaderboard } from "./components/leaderboard";
import { NonePage } from "./components/none";
import { RankPage } from "./components/rank";
import { getUser, getUsers } from "./util";

export const generateImage = async (fid: number) => {
  const users = await getUsers();
  const user = getUser(fid, users);

  if (user == undefined) {
    return <NonePage />;
  }

  const { rank, yoinks, times, username } = user;

  const getMilestone = (rank: number) => {
    if (rank == 1) {
      return { rank: 0, time: 0 };
    } else if (rank > 500) {
      return { rank: 500, time: users[499].times };
    } else if (rank > 400) {
      return { rank: 400, time: users[399].times };
    } else if (rank > 300) {
      return { rank: 300, time: users[299].times };
    } else if (rank > 200) {
      return { rank: 200, time: users[199].times };
    } else if (rank > 100) {
      return { rank: 100, time: users[99].times };
    } else if (rank > 50) {
      return { rank: 50, time: users[49].times };
    }
    return { rank: rank - 1, time: users[rank - 2].times };
  };

  return (
    <RankPage
      username={username}
      rank={rank}
      total={users.length}
      yoinks={yoinks}
      time={times}
      milestone={getMilestone(rank)}
    />
  );
};

export const generateLeaderboard = async (fid: number) => {
  const users = await getUsers();
  return <Leaderboard fid={fid} users={users} />;
};
