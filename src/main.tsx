import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';
import { DefaultLayout } from './components/layout';
import { Feed } from './modules/Feed/screens/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: `*`,
    element: <Navigate to="/feed" replace />,
  },
  {
    path: '/feed',
    element: (
      <DefaultLayout>
        <Feed />
      </DefaultLayout>
    ),
  },
] as RouteObject[]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={'dark'} />
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
);
