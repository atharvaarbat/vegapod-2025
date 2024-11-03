import Indicator from "./indicator"
import DataContext from "@/lib/context";
import { useContext } from "react";

const Warnings = () => {
  const { headerErrors } = useContext(DataContext);
  return (
    <div className="flex gap-2">
      {
        Object.entries(headerErrors).map(([key, value]) => (
          <Indicator key={key} name={value.name} status={value.status} icon={value.icon} />
        ))
      }
    </div>
  )
}

export default Warnings