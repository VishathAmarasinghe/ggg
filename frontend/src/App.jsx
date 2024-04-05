import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import MainPageLayout from "./Pages/MainPageLayout"



function App() {
 

  return (
    <Routes>
      <Route path="/login" Component={Login}/>
      
      <Route path="/" Component={MainPageLayout}/>
      
    </Routes>
  )
}

export default App
