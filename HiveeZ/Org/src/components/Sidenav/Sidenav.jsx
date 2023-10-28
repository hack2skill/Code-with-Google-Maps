import React from "react";
import box from "../../assets/box.svg";
import chip from "../../assets/chip.svg";

const Sidenav = ({ selectedMenuItem, handleMenuItemClick }) => {
  return (
    <>
      <div className="grey-box pt-1 h-[80vh] mb-10">
        {/* ... your other code ... */}

        <div
          className={`mt-10 cursor-pointer mx-3 ${
            selectedMenuItem === "Inventory"
              ? "bg-[#001A75] rounded-[12px] text-white"
              : "bg-[#e5e5e5] rounded-[12px] text-black"
          }`}
          onClick={() => handleMenuItemClick("Inventory")}
        >
          <div className="flex py-3">
            <img src={box} className="w-6 ml-4 mr-3" />
            <h3 className="font-semibold text-lg">Inventory</h3>
          </div>
        </div>

        <div
          className={`mt-4 cursor-pointer mx-3 ${
            selectedMenuItem === "Simulator"
              ? "bg-[#001A75] rounded-[12px] text-white"
              : "bg-[#e5e5e5] rounded-[12px] text-black"
          }`}
          onClick={() => handleMenuItemClick("Simulator")}
        >
          <div className="flex py-3">
            <img src={chip} className="w-6 ml-4 mr-3" />
            <h3 className="font-semibold text-lg">Simulator</h3>
          </div>
        </div>

        <div
          className={`mt-4 cursor-pointer mx-3 ${
            selectedMenuItem === "Alert"
              ? "bg-[#001A75] rounded-[12px] text-white"
              : "bg-[#e5e5e5] rounded-[12px] text-black"
          }`}
          onClick={() => handleMenuItemClick("Alert")}
        >
          <div className="flex py-3">
            <img src="" className="w-6 ml-4 mr-3" />
            <h3 className="font-semibold text-lg">Alert</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
