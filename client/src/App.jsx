import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/appRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" duration={4000} />
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;
