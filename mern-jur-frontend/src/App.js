import { AuthProvider } from "./Context/AuthContext";
import { Routing } from "./Routing/Routing";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routing />
      </div>
      
    </AuthProvider>
  );
}

export default App;
