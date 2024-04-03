export default function Page() {
  return (
    <div style={{ width: "900px", height: "420px" }}> {/* Canvas for the frame */}
      {/* Actual frame markdown to adjust */}
      <div className="w-full h-full text-white justify-center items-center flex flex-col"
          style={{backgroundColor: "#282828" }}>
        <div className="flex">
          <div className="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-center p-8">
            <h2 className="flex flex-col text-8xl font-bold tracking-tight text-left">
              <span className="font-bold pb-5" style={{color: "#b16286"}}>Do you Yoink? 🚩</span>
              <span className="font-bold" style={{color: "#8ec07c"}}>Check your stats!</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}