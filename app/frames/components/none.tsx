export const NonePage = () => {
  return (
    <div
      tw="w-full h-full text-white justify-center items-center flex flex-col"
      style={{ backgroundColor: "#282828" }}
    >
      <div tw="flex h-full">
        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
          <h2 tw="flex flex-col font-bold text-left">
            <div tw="flex flex-col">
              {/*<div tw="flex flex-col justify-end">
              <div tw={`flex ${nameSizeClass}`}>
                <span tw="" style={{color: "#b16286"}}>{displayName}</span>
              </div>
            </div>*/}
              <div tw="flex flex-col text-right justify-end">
                <div tw="flex text-7xl mb-1">
                  <span style={{ color: "#8ec07c" }}>
                    You have never Yoinked!
                  </span>
                </div>
              </div>
            </div>
          </h2>
        </div>
        <span tw="absolute bottom-2 right-4">/yoink 🚩</span>
      </div>
    </div>
  );
};
