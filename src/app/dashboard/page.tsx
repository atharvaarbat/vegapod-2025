import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,

} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
