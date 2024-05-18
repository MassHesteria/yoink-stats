import { formatTime } from "../util";

export const RankPage = ({
  username,
  rank,
  total,
  yoinks,
  time,
  milestone,
}: {
  username: string;
  rank: number;
  total: number;
  yoinks: number;
  time: number;
  milestone: { rank: number; time: number };
}) => {
  const nameSizeClass = username.length > 20 ? "text-7xl" : "text-8xl";
  const statsLabelColor = "#8ec07c";
  const statsValueColor = "#458588";
  return (
    <div
      tw="w-full h-full text-white justify-center items-center flex flex-col"
      style={{ backgroundColor: "#282828" }}
    >
      <div tw="flex h-full">
        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
          <h2 tw="flex flex-col font-bold tracking-tight text-left">
            <div tw="flex flex-col">
              <div tw="flex flex-col justify-end">
                <div tw={`flex ${nameSizeClass}`}>
                  <span tw="" style={{ color: "#b16286" }}>
                    {username}
                  </span>
                </div>
              </div>
              <div tw="flex flex-col text-right justify-end">
                <div tw="flex text-7xl mb-1">
                  <span tw="pr-4" style={{ color: "#928374" }}>
                    Rank
                  </span>
                  <span tw="pr-4" style={{ color: "#fabd2f" }}>
                    {rank}
                  </span>
                  <span tw="pr-4" style={{ color: "#928374" }}>
                    of
                  </span>
                  <span tw="" style={{ color: "#fabd2f" }}>
                    {total}
                  </span>
                </div>
              </div>
            </div>
            <div tw="flex pl-1 pt-6 flex-wrap">
              <div tw="flex pr-10">
                <span tw="" style={{ color: statsLabelColor }}>
                  Yoinks
                </span>
                <span tw="pl-4" style={{ color: statsValueColor }}>
                  {yoinks}
                </span>
              </div>
              <div tw="flex">
                <span tw="" style={{ color: statsLabelColor }}>
                  Time Held
                </span>
                <span tw="pl-4" style={{ color: statsValueColor }}>
                  {formatTime(time)}
                </span>
              </div>
            </div>
            {milestone.rank > 0 && (
              <div tw="flex flex-wrap pl-1">
                <span tw="" style={{ color: statsLabelColor }}>
                  Next Milestone
                </span>
                <span tw="pl-4 pr-4" style={{ color: statsValueColor }}>
                  {milestone.rank % 100 == 0 || milestone.rank == 50
                    ? `Top ${milestone.rank}`
                    : `Rank ${milestone.rank}`}
                </span>
                <span tw="" style={{ color: statsLabelColor }}>
                  at
                </span>
                <span tw="pl-4" style={{ color: statsValueColor }}>
                  {formatTime(milestone.time)}
                </span>
              </div>
            )}
            <div tw="flex pl-1">
              <span tw="" style={{ color: statsLabelColor }}>
                Average Time Held
              </span>
              <span tw="pl-4" style={{ color: statsValueColor }}>
                {formatTime(Math.floor(time / yoinks))}
              </span>
            </div>
          </h2>
        </div>
        <span tw="absolute bottom-2 right-4">/yoink 🚩</span>
      </div>
    </div>
  );
};
