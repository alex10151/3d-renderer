import { Route, BrowserRouter, useRoutes, Router } from 'react-router-dom';
// @ts-ignore
import Container from './components/container.tsx';

const Routes = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Container />,
      children: [
        {
          path: 'container',
          element: <Container />,
        },
      ],
    },
    {
      path: '/*',
      element: <div>404</div>,
    },
  ]);
  return element;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  );
};

export default App;
