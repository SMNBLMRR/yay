import { FunctionComponent } from "react";

import authOptions from "@/lib/authOptions";
import { getUserInfo } from "@/lib/user";
import { getServerSession } from "next-auth";
import Info from "./(ui)/Info";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  const userInfo = await getUserInfo(session?.user.id);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* <div className="h-full w-[250px] bg-[#151515] border-r-1 border-[#b9b4ff]"> */}
      {/* <Info
        user={userInfo}
        name={session?.user.name}
        email={session?.user.email}
      /> */}

      {/* </div> */}
      {children}
    </div>
  );
};

export default Layout;
