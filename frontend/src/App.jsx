import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Registration"
import MainPageLayout from "./Pages/MainPageLayout"



function App() {
 

  return (
    <Routes>
      <Route path="/login" Component={Login}/>
      <Route path="/Register" Component={Register}/>

      
      <Route path="/" Component={MainPageLayout}/>
      
    </Routes>
  )
}

export default App
