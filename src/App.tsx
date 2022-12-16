import StatusBox from "./components/StatusBox"

function App() {
  return (
    <div className="container h-screen flex items-center justify-center mx-auto">
      <div className="flex flex-row flex-wrap gap-20">
        <StatusBox />
        <StatusBox />
      </div>
    </div>
  )
}

export default App
