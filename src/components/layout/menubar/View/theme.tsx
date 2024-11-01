import { MenubarCheckboxItem, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@/components/ui/menubar"
import { useTheme } from "@/components/ui/theme-provider"

export const ThemeSwitch = () => {
    const {theme, setTheme} = useTheme();
    return (
        <MenubarSub >
            <MenubarSubTrigger>Theme</MenubarSubTrigger>
            <MenubarSubContent>
                <MenubarCheckboxItem checked={theme === "dark"} onClick={() => setTheme("dark")}>Dark</MenubarCheckboxItem>
                <MenubarCheckboxItem checked={theme === "light"} onClick={() => setTheme("light")}>Light</MenubarCheckboxItem>
                <MenubarCheckboxItem checked={theme === "system"} onClick={() => setTheme("system")}>System</MenubarCheckboxItem>
            </MenubarSubContent>
        </MenubarSub>
    )
}
