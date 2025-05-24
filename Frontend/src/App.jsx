import About from "./components/About";
import Help from "./components/Help";
import Home from "./components/Home";
import Tasks from './components/Tasks';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from "./Layouts/AppLayout";
import AddData from "./components/AddData";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Generate from "./components/Generate";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: "/tasks",
          element: <Tasks />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: "/help",
          element: <Help />
        },
        {
          path: "/add-data",
          element: <AddData />
        },
        {
          path: "/generate",
          element : <Generate/>
        }
      ]
    },
  ]);
  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <RouterProvider router={router}></RouterProvider>

    </>
  )
}