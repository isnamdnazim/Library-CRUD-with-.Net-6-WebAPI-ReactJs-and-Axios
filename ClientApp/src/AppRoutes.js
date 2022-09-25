import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { MyClassComponent } from "./components/MyComponents/MyClassComponent";
import  MyFunctionalComponent  from "./components/MyComponents/MyFunctionalComponent";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
    },
    {
        path: '/myClassComponent',
        element: <MyClassComponent />
    },
    {
        path: '/myFunctionalComponent',
        element: <MyFunctionalComponent />
    }
];

export default AppRoutes;
