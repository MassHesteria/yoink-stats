export const IntroPage = () => {
  return (
    <div
      tw="w-full h-full text-white justify-center items-center flex flex-col"
      style={{ backgroundColor: "#282828" }}
    >
      <div tw="flex">
        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-center p-8">
          <h2 tw="flex flex-col text-8xl font-bold tracking-tight text-left">
            <span tw="font-bold pb-5" style={{ color: "#b16286" }}>
              Do you Yoink? 🚩
            </span>
            <span tw="font-bold" style={{ color: "#8ec07c" }}>
              Check your stats!
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};
