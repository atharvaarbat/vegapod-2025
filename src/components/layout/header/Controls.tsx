import { Button } from "@/components/ui/button"
import useControls from "@/hooks/useControls";
const Controls = () => {
    const {setControl} = useControls()
  return (
    <div>
        <Button onClick={()=>setControl("run", true)}>
            Run
        </Button>
        <Button onClick={()=>setControl("pause", true)}>
            Stop
        </Button>
    </div>
  )
}

export default Controls