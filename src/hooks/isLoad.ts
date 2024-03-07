import { useState } from "react";

export const IsLoad = () => {
  const [isLoad, setIsLoad] = useState(false);

  const handlerIsLoad = () => setIsLoad(true);

  return { isLoad, handlerIsLoad };
};
