// import VCUState from "@/app/modules/vcu-graph/VCUState";
import { Button } from "@/components/ui/button"
import WebSocketComponent from "@/components/WebSocketTest"
import useHeaderError from "@/hooks/useHeaderIndicators"
import DataContext from "@/lib/context";
import { useContext, useEffect } from "react";

const General = () => {
  const updateHeaderError = useHeaderError();
  const {setWs} = useContext(DataContext);
  useEffect(() => {
    // setWs(new WebSocket("ws://172.20.10.2/ws"));
  })
  return (
    <div >   
      <Button 
       onClick={() => updateHeaderError('temprature', 'normal')}
      >
        Run Test</Button>
        <div className="flex">

        <WebSocketComponent/>       
         <WebSocketComponent/>

        </div>
      
      
      {/* <VCUState/> */}
    </div>
  )
}

export default General