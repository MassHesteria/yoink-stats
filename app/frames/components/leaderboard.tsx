import { User, formatTime, getUser } from "../util";
import { NonePage } from "./none";

const getCloseUsers = (user: User, users: User[]) => {
  if (user.rank < 10) {
    return users.slice(0, 9)
  }
  if (user.rank > users.length - 9) {
    return users.slice(users.length - 9)
  }
  return users.slice(user.rank - 5, user.rank + 4)
}

export const Leaderboard = ({ fid, users}: {fid: number, users: User[]}) => {
  const user = getUser(fid, users)
  if (user == undefined) {
    return <NonePage />
  }
  return (
    <div
      tw="w-full h-full text-white justify-center flex flex-col"
      style={{ backgroundColor: "#282828" }}
    >
      <div tw="flex">
        <div tw="flex flex-col w-full items-center">
          <div tw="flex flex-row text-7xl">
            <div tw="pr-4">Yoink 🚩</div>
            <div tw="text-5xl pt-6 h-full">by horsefacts.eth</div>
          </div>
          <div tw="flex flex-col pt-9 pl-5">
            <div tw="text-6xl pb-3" style={{ color: '#928374' }}>
            Podium
            </div>
            <div tw="flex flex-col w-full">
                <div key={user.userId} tw="flex flex-col text-5xl font-bold tracking-tight">
                  <div tw="flex flex-row pb-3">
                    <span style={{ width: '20%'}}>
                    🥇
                    </span>
                    <span style={{ width: '44%'}}>
                    {users[0].username}
                    </span>
                    <span style={{ color: '#458588', width: '30%' }}>
                    {formatTime(users[0].times)}
                    </span>
                  </div>
                  <div tw="flex flex-row pb-3">
                    <span style={{ width: '20%'}}>
                    🥈
                    </span>
                    <span style={{ width: '44%'}}>
                    {users[1].username}
                    </span>
                    <span style={{ color: '#458588', width: '30%' }}>
                    {formatTime(users[1].times)}
                    </span>
                  </div>
                  <div tw="flex flex-row">
                    <span style={{ width: '20%'}}>
                    🥉
                    </span>
                    <span style={{ width: '44%'}}>
                    {users[2].username}
                    </span>
                    <span style={{ color: '#458588', width: '30%' }}>
                    {formatTime(users[2].times)}
                    </span>
                  </div>
                </div>
            </div>
          </div>
          <div tw="flex flex-col pt-9 font-bold pl-5">
            <div tw="text-6xl pb-3" style={{ color: '#928374' }}>
            Leaderboard
            </div>
            {getCloseUsers(user, users).map((u) => {
              let rankColor = u.rank == user.rank ? "#fabd2f" : "#b16286"
              let nameColor = u.rank == user.rank ? "#fabd2f" : "#8ec07c"
              let timeColor = u.rank == user.rank ? "#fabd2f" : "#458588"
              return (
                <div key={user.userId} tw="flex flex-row text-5xl tracking-tight">
                  <span tw="" style={{ color: rankColor, width: '20%' }}>
                  {u.rank}
                  </span>
                  <span tw="" style={{ color: nameColor, width: '44%' }}>
                  {u.username}
                  </span>
                  <span tw="" style={{ color: timeColor, width: '30%' }}>
                  {formatTime(u.times)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
