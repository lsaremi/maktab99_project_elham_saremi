import ReactDOM from "react-dom";

export const WrapperModals = ({ children, onClick }) => {
  return ReactDOM.createPortal(
    <div onClick={onClick} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 backdrop-filter backdrop-blur-3xl  bg-[#e6eae4] opacity-30" />
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        {children}
      </div>
    </div>,
    document.getElementById("overlay-root")
  );
};
