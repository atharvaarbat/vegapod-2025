import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"
import AppFooter from "./components/layout/footer/app-footer"
import AppHeader from "./components/layout/header/app-header"
import General from "./profiles/GeneralProfile"
import Levitation from "./profiles/LevitationProfile"
import MotorProfile from "./profiles/MotorProfile"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <RenderProfile />
        </div>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}


const RenderProfile = () => {
  const profile = localStorage.getItem('profile') || 'General'
  if (profile === 'General') {
    return <General />
  } else if (profile === 'Levitation-test') {
    return <Levitation />
  } else if (profile === 'Motor-test') {
    return <MotorProfile />
  }
}