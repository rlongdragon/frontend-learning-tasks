import { JSX } from "react";
import "./App.css";
import Container from "./components/Container";
import {
  AchievementProvider
} from "./lib/data/useAchievementData";

import Page from "./pages";

function App() {
  return (
    <AchievementProvider>
      <div className="notosans">
        <Container>
          <Page />
        </Container>
      </div>
    </AchievementProvider>
  );
}

export default App;
