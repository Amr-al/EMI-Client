import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import AllFaxs from "./components/Faxs/AllFaxs";
import {
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import SingleDoc from "./components/Faxs/SingleDoc";
import UnseenFaxs from "./components/Faxs/UnseenFaxs";
import Forwards from "./components/Faxs/Forwards";
function App() {
  return (
    <Routes>
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<ProtectedRoute><SignUp /></ProtectedRoute>} />
      <Route exact path="/unreads/:id" element={<ProtectedRoute><SingleDoc /></ProtectedRoute>} />
      <Route exact path="/forwards/:role" element={<ProtectedRoute><Forwards /></ProtectedRoute>} />
      <Route exact path="/docs/:bossName" element={<ProtectedRoute> <UnseenFaxs /> </ProtectedRoute>} />
      <Route
        exact
        path="*"
        element={
          <ProtectedRoute>
            <AllFaxs />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
}

export default App;
