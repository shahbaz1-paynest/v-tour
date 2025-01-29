import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Loader from './components/Loader';
import { scenes, AppartmentProps, FloorProps, RoomProps, BuildingProps } from './props';

const Building = lazy(() => import('./components/Building'));
const Floor = lazy(() => import('./components/Floor'));
const Appartment = lazy(() => import('./components/Appartment'));
const Room = lazy(() => import('./components/Room'));
const PanoramaViewer = lazy(() => import('./components/VTour'));

const router = createBrowserRouter([
  {
    path: "building/:buildingName",
    element: (
      <Suspense fallback={<Loader />}>
      <Building {...BuildingProps} />
    </Suspense>
    ),
  },
  {
    path: "/floor/:floorName",
    element: (
      <Suspense fallback={<Loader />}>
      <Floor {...FloorProps} />
    </Suspense>
    ),  },
  {
    path: "/appartment/:apartmentName",
    element: (
      <Suspense fallback={<Loader />}>
      <Appartment {...AppartmentProps} />
    </Suspense>
    ),
  },
  {
    path: "/room/:roomName",
    element: (
      <Suspense fallback={<Loader />}>
      <Room {...RoomProps} />
    </Suspense>
    ),  },
  {
    path: "/panorama/:sceneId",
        element: (
      <Suspense fallback={<Loader />}>
      <PanoramaViewer
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