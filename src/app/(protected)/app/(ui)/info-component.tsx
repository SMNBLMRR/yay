"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Kbd,
  Tooltip,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { FunctionComponent } from "react";
import { CgDarkMode } from "react-icons/cg";
import { FaRegFileLines } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { TbSettings } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";

interface InfoProps {
  user: any;
  name: string;
  email: string;
}

const Info: FunctionComponent<InfoProps> = ({ name, email }) => {
  return (
    <div className="px-2 py-5 flex flex-col justify-between items-center relative">
      {/* user info */}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            name={name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{email}</p>
          </DropdownItem>
          <DropdownItem
            className="font-extrabold"
            key="new_file"
            shortcut="⌘N"
            startContent={<FaRegFileLines />}
          >
            New file
          </DropdownItem>
          <DropdownItem
            key="custom_theme"
            startContent={<CgDarkMode />}
            // endContent={
            //   <Switch
            //     defaultSelected
            //     size="md"
            //     color="success"
            //     startContent={<MdOutlineWbSunny />}
            //     endContent={<IoMoonOutline />}
            //   >
            //   </Switch>
            // }
          >
            Theme
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* project section */}
      <div className="flex items-center justify-center flex-col">
        <div className="w-[50px] h-fit bg-gray-700 rounded-xl flex flex-col p-1 cursor-pointer">
          <Tooltip
            placement="right"
            content={
              <div className="px-1 py-2 flex justify-between items-center cursor-pointer">
                <div>
                  <span className="font-light">Search content</span>
                </div>
                <div className="ml-2">
                  <span>
                    <Kbd keys={["command"]}>S</Kbd>
                  </span>
                </div>
              </div>
            }
          >
            <div className="bg-[#0f0e0e] p-1 h-[40px] rounded-xl flex justify-center items-center">
              <IoSearchOutline color="text-gray-600" />
            </div>
          </Tooltip>

          <Tooltip
            placement="right"
            content={
              <div className="px-1 py-2 flex justify-between items-center cursor-pointer">
                <div>
                  <span className="font-light">Add file</span>
                </div>
                <div className="ml-2">
                  <span>
                    <Kbd keys={["command"]}>N</Kbd>
                  </span>
                </div>
              </div>
            }
          >
            <div className="bg-[#0f0e0e] p-1 h-[40px] rounded-xl flex justify-center items-center mt-2">
              <FaRegFileLines color="text-gray-600" />
            </div>
          </Tooltip>

          <Tooltip
            placement="right"
            content={
              <div className="px-1 py-2 flex justify-between items-center cursor-pointer">
                <div>
                  <span className="font-light">Go to calendar</span>
                </div>
                <div className="ml-2">
                  <span>
                    <Kbd keys={["command"]}>C</Kbd>
                  </span>
                </div>
              </div>
            }
          >
          <div className="bg-[#0f0e0e] p-1 h-[40px] rounded-xl flex justify-center items-center mt-2">
            <IoCalendarOutline color="text-gray-600" />
          </div>
          </Tooltip>


          <Tooltip
            placement="right"
            content={
              <div className="px-1 py-2 flex justify-between items-center cursor-pointer">
                <div>
                  <span className="font-light">Settings</span>
                </div>
              </div>
            }
          >
          <div className="bg-[#0f0e0e] p-1 h-[40px] rounded-xl flex justify-center items-center mt-2">
            <TbSettings color="text-gray-600" />
          </div>
          </Tooltip>


        </div>
      </div>

      {/* footer */}
      <div>
        <span className="text-xs text-[#474747]">2024 yay copirigth</span>
      </div>
    </div>
  );
};

export default Info;
