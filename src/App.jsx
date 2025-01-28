import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Loader from './components/Loader';

const Building = lazy(() => import('./components/Building'));
const Floor = lazy(() => import('./components/Floor'));
const Appartment = lazy(() => import('./components/Appartment'));
const Room = lazy(() => import('./components/Room'));
const PanoramaViewer = lazy(() => import('./components/VTour'));
const RoomTour = lazy(() => import('./components/RoomTour'));


const withLoader = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withLoader(Building),
  },
  {
    path: "/floor",
    element: withLoader(Floor),
  },
  {
    path: "/appartment",
    element: withLoader(Appartment),
  },
  {
    path: "/room",
    element: withLoader(Room),
  },
  {
    path: "/panorama",
    element: withLoader(PanoramaViewer),
  },
  {
    path: "/living-room",
    element: withLoader(RoomTour),
  },
]);

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;