import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) throw new Error("context is missing");
  return context;
};

export default useActivities;
