import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/ui/theme-provider.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <App />
        <Toaster/>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
