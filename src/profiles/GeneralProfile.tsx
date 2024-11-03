import { Button } from "@/components/ui/button"
import WebSocketComponent from "@/components/WebSocketTest"
import useHeaderError from "@/hooks/useHeaderIndicators"

const General = () => {
  const updateHeaderError = useHeaderError();
  return (
    <div>   
      <Button 
       onClick={() => updateHeaderError('temprature', 'normal')}
      >
        Run Test</Button>
      <WebSocketComponent/>

    </div>
  )
}

export default General