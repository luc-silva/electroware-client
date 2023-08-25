import ReactDOM from "react-dom/client";
import Electroware from "./Electroware";

import "./index.css";

const html = document.getElementById("root");

if (html) {
    const root = ReactDOM.createRoot(html);
    root.render(<Electroware />);
}
