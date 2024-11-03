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
import AppMenubar from "./components/layout/menubar/app-menubar"
import { useContext } from "react"
import DataContext from "./lib/context"
import CLI from "./app/cli/CLI"

export default function Page() {
  return (
    <>
    <SidebarProvider>
      <div className="absolute z-40">
        <AppMenubar />
      </div>
      
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex h-[calc(100vh_-_164px)] overflow-y-auto flex-col gap-4 p-4">
            <RenderProfile />
          </div>
          <AppFooter />
        </SidebarInset>
      </SidebarProvider>
    </>

  )
}


const RenderProfile = () => {
  const {profile} = useContext(DataContext);
  if (profile === 'General') {
    return <General />
  } else if (profile === 'Levitation-test') {
    return <Levitation />
  } else if (profile === 'Motor-test') {
    return <MotorProfile />
  } else if (profile === 'Terminal') {
    return <CLI />
  }
}