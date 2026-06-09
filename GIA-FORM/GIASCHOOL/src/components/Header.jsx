import React from "react";
import { IoIosMail } from "react-icons/io";
const Header = () => {
  return (
    <div className=" flex bg-[#92C7CF] w-full h-16">
      <div className=" flex  items-center  gap-2 px-2">
        <h1 className="text-xl">
          {" "}
          <IoIosMail />
        </h1>

        <h1 className=" text-sm font-bold">experiencepavillion@gmail.com</h1>
      </div>
    </div>
  );
};

export default Header;
