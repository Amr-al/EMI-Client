import SignIn from "./components/authentication/SignIn";
import Header from "./components/commons/Header";
import AllFaxs from "./components/Faxs/AllFaxs";
import Temp from "./components/modals/Temp";
import SideBar from "./components/sideBar/SideBar";
import {
  Routes,
  BrowserRouter,
  Route,
  useBeforeUnload,
} from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route exact path="/signin" element={<SignIn/>} />
      <Route
        exact
        path="*"
        element={
          <>
          <Temp/>
            <AllFaxs/>
          </>
        }
      />
    </Routes>
        
  );
}

export default App;
