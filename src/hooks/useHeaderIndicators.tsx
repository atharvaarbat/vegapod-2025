import { useContext } from "react";
import DataContext from "@/lib/context";
import { ErrorStatus } from "@/lib/context";

const useUpdateHeaderError = () => {
  const { setHeaderErrors } = useContext(DataContext);

  const updateHeaderError = (name: string, status: ErrorStatus) => {
    setHeaderErrors((prevErrors) => ({
      ...prevErrors,
      [name]: {
        ...prevErrors[name],
        status,
      },
    }));
  };

  return updateHeaderError;
};

export default useUpdateHeaderError;
