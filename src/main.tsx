import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ThemeProvider } from './components/ui/theme-provider.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { Toaster } from 'sonner'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import CLI from './app/cli/CLI.tsx'
import { DataProvider } from './lib/context.tsx'


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/cli",
//     element: <CLI />,
//   }
// ]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <DataProvider>
          {/* <RouterProvider router={router} /> */}
          <App />
          <Toaster />
        </DataProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
