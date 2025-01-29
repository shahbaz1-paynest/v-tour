import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Loader from './components/Loader';
import { scenes, AppartmentProps, FloorProps, RoomProps, BuildingProps } from './props';

const Building = lazy(() => import('./components/Building'));
const Floor = lazy(() => import('./components/Floor'));
const Appartment = lazy(() => import('./components/Appartment'));
const Room = lazy(() => import('./components/Room'));
const PanoramaViewer = lazy(() => import('./components/VTour'));

const withLoader = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
      <Building {...BuildingProps} />
    </Suspense>
    ),
  },
  {
    path: "/floor",
    element: (
      <Suspense fallback={<Loader />}>
      <Floor {...FloorProps} />
    </Suspense>
    ),  },
  {
    path: "/appartment",
    element: (
      <Suspense fallback={<Loader />}>
      <Appartment {...AppartmentProps} />
    </Suspense>
    ),
  },
  {
    path: "/room",
    element: (
      <Suspense fallback={<Loader />}>
      <Room {...RoomProps} />
    </Suspense>
    ),  },
  {
    path: "/panorama",
    element: (
      <Suspense fallback={<Loader />}>
        <PanoramaViewer
          initialScene="bedroom"
          scenes={scenes}
          brightness={-0.1}
          contrast={1}    
        />
      </Suspense>
    ),
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