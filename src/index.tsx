import ReactDOM from "react-dom/client";
import "open-iconic/font/css/open-iconic.min.css";
import "./index.css";
import App from "./app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
