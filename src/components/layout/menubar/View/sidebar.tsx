import { MenubarItem } from '@/components/ui/menubar'
import { useSidebar } from '@/components/ui/sidebar'

export const SidebarToggle = () => {
    const { toggleSidebar, state} = useSidebar()
  return (
    <MenubarItem onClick={() => {toggleSidebar()}} >
      {state === "expanded" ? "Hide Sidebar" : "Show Sidebar"}
    </MenubarItem>
  )
}