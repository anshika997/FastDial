import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import NotFoundPage from "./Components/NotFoundPage";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboad from "./dynamicForm/AdminDashboad";

//dynamic form
import AdminFormBuilder from "./dynamicForm/AdminFormBuilder";
import FormRenderer from "./dynamicForm/FormRenderer";
import FormResponses from "./dynamicForm/FormResponses";
import ListOfForms from "./dynamicForm/ListOfForms";
import EditFormBuilder from "./dynamicForm/EditFormBuilder";
import ListofGroup from "./dynamicForm/ListofGroup";
import ListofGroupuser from "./dynamicForm/ListofForUser";
import FormRendererbyfrom from "./dynamicForm/FormRender2";
function App() {
  return (
    <>
      {" "}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AdminDashboad" element={<AdminDashboad />} />{" "}
            <Route
              path="/AdminFormBuilder/:groupId"
              element={<AdminFormBuilder />}
            />{" "}
            <Route path="/FormRenderer/:groupId" element={<FormRenderer />} />{" "}
            <Route path="/FormResponses" element={<FormResponses />} />
            <Route path="/ListOfForms/:groupId" element={<ListOfForms />} />
            <Route path="/ListofGroup" element={<ListofGroup />} />
            <Route
              path="/ListofGroupuser/:groupId"
              element={<ListofGroupuser />}
            />
            <Route path="/EditFormBuilder" element={<EditFormBuilder />} />
            <Route
              path="/FormRendererbyform/:formId"
              element={<FormRendererbyfrom />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
