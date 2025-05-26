import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./components/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
    return (
        <>
            <RouterProvider router={AppRouter} />
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default App;
