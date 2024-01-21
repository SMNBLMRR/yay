"use client";
import { FunctionComponent } from "react";

interface WrapperProps {
  children: React.ReactNode;
}
 
const Wrapper: FunctionComponent<WrapperProps> = ({children}) => {
  return (
    <>
    <h1>wrapper</h1>
      {children}
    </> 
   );
}
 
export default Wrapper;