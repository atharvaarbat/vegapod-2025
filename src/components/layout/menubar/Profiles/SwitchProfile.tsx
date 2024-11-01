import { MenubarRadioGroup, MenubarRadioItem } from '@/components/ui/menubar'
import DataContext from '@/lib/context'
import React from 'react'
import { appData } from '../../sidebar/app-sidebar'

export const SwitchProfile = () => {
    const { setProfile, profile } = React.useContext(DataContext)
    return (
        <MenubarRadioGroup value={profile} onValueChange={setProfile}>
            {
                appData.versions.map((profile) => (
                    <MenubarRadioItem key={profile} value={profile}>{profile}</MenubarRadioItem>
                ))
            }
        </MenubarRadioGroup>
    )
}

