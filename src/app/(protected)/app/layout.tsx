import { FunctionComponent, ReactDOM } from "react";
import Info from "./(ui)/info";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

interface LayoutProps {
  children: React.ReactNode;
}
 
const Layout: FunctionComponent<LayoutProps> = async ({children}) => {

  const session = await getServerSession(authOptions);
  
  return ( 
    <div className="flex h-screen w-full overflow-hidden">
      {/* <div className="h-full w-[250px] bg-[#151515] border-r-1 border-[#b9b4ff]"> */}
        <Info name={session?.user.name} email={session?.user.email}/>        
      {/* </div> */}
      {children}
    </div>
   );
}
 
export default Layout;