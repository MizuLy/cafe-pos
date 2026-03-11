import Mainlayout from "./components/Mainlayout";
import Mainrouter from "./routes/Mainrouter";

export default function App() {
  return (
    <div>
      <Mainlayout>
        <Mainrouter />
      </Mainlayout>
    </div>
  );
}
