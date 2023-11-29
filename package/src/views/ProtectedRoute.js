import { useState } from "react";


function ProtectedRoute({children}) {
   

    const [isLoading,setIsLoading]=useState(true)

  return children;
}

export default ProtectedRoute
