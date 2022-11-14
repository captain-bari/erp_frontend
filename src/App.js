import * as React from "react";
import SignIn from "./components/signin";
import ResponsiveDrawer from "./components/dash";
import "./App.css";

function App() {
  const [dash, setDash] = React.useState(false);

  const enableDash = (bool) => {
    setDash(bool);
  };

  return (
    <div className="App">
      {!dash ? <SignIn enableDash={enableDash} /> : <ResponsiveDrawer />}
    </div>
  );
}

export default App;
