import { Button } from "@/components/ui/button"
import useTerminal from "@/hooks/useTerminal"
const Controls = () => {
    const { printLine } = useTerminal();
  return (
    <div>
        <Button onClick={()=>printLine("hello")}>
            Run
        </Button>
    </div>
  )
}

export default Controls