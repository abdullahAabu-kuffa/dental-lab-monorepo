"use client"; // Mark as client component if using App Router

interface SwitchButtonProps {
    isOn: boolean;
    toggleSwitch: () => void;
}
const SwitchButton = ({isOn,toggleSwitch}:SwitchButtonProps) => {

  return (
    <div className="" onClick={toggleSwitch}>
      <div
        className={`${isOn ? "bg-blue-600" : "bg-gray-300"} w-12 h-6 rounded-full relative transition-colors duration-300`}
      >
        <div
          className={`${isOn ? "translate-x-6" : "translate-x-0"} bg-white w-6 h-6 rounded-full absolute top-0 left-0 shadow-md transform transition-transform duration-300`}
        ></div>
      </div>
    </div>
  );
};

export default SwitchButton;
