import { Route, Routes, Switch } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Switch>
        <Route path="/" element={< />} />
        <Route path="/login" element={< />} />
        <Route path="/register" element={< />} />
        <Route path="/review" element={< />} />
        <Route path="/schedule" element={< />} />
        <Route path="/" element={< />} />
      </Switch>
    </Routes>
  );
};

export default App;
