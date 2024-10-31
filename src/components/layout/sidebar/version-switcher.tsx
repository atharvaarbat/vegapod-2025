import * as React from "react"
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function ProfileSwitcher({
  profiles,
  defaultProfile,
}: {
  profiles: string[]
  defaultProfile: string
}) {
  const [selectedProfile, setSelectedProfile] = React.useState(defaultProfile)
  const onProfileSelect = (e: string) => {
    setSelectedProfile(e);
    localStorage.setItem('profile', e)
    window.location.reload()
  }
  React.useEffect(() => {
    if (localStorage.getItem('profile')) {
      setSelectedProfile(localStorage.getItem('profile') as string)
    } else {
      onProfileSelect(defaultProfile)
    }
  }, [])
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="text-xs text-muted-foreground">Profile</span>
                <span className="">{selectedProfile}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {profiles.map((profile) => (
              <DropdownMenuItem
                key={profile}
                onSelect={() => onProfileSelect(profile)}
              >
                {profile}
                {profile === selectedProfile && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
