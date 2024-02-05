"use client";
import { cn, priorityLabelBg } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Divider,
  Input,
} from "@nextui-org/react";
import { Goal } from "@prisma/client";
import { FunctionComponent, useState } from "react";
import { RiMoreFill } from "react-icons/ri";
import { Drawer } from "vaul";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import DrawerContent from "./DraweContent";


interface YayDrawerProps {
  goal: any;
  isOpen: boolean;
  setIsOpen: any;
}

const YayDrawer: FunctionComponent<YayDrawerProps> = ({
  goal,
  isOpen = false,
  setIsOpen,
}) => {
  const [isClose, setIsClose] = useState(false);
  const [selectedGoal,setSelectedGoal] = useState(goal);
  return (
    <div className="z-50">
      <Drawer.Root
        onClose={() => {
          setIsOpen(false);
          setIsClose(true);
        }}
        open={isOpen || !isClose}
        direction="right"
        shouldScaleBackground
      >
        <DrawerContent setSelectedGoal={setSelectedGoal} goal={selectedGoal} />
      </Drawer.Root>

    </div>
  );
};

export default YayDrawer;
