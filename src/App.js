import Routes from "./routes";
import { ProvideAuth } from "./hooks/useAuth";

const App = () => {
  return (
    <ProvideAuth>
      <Routes />
    </ProvideAuth>
  );
};

export default App;
