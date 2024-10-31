import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/ui/theme-mode-toggle"
import Warning from "./warnings"
import Controls from "./Controls"

const AppHeader = () => {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <Warning />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Controls />
            <ModeToggle />
        </header>
    )
}

export default AppHeader