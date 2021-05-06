import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
import Login from "./Components/User/Login/Login";
import AdminChat from "./Components/Admin/AdminChat/AdminChat";
import Chat from "./Components/User/Chat/Chat";

function App() {
  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route path="/chat" component={Chat} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/adminchat" component={AdminChat} />
    </Router>
  );
}

export default App;
