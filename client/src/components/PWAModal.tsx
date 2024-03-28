function PWAModal({
  show,
  onClose,
  onInstall,
}: {
  onInstall: () => void;
  onClose: () => void;
  show: boolean;
}) {
  return (
    show && (
      <div className="fixed p-4 inset-0 bg-black/20 flex items-center justify-center z-[100] ">
        <div className="w-full shadow-lg shadow-slate-300 max-w-xl flex flex-col gap-5 p-2 rounded-xl h-full max-h-[200px] bg-white">
          <h1 className="text-2xl font-semibold mt-3">Install the App</h1>
          <h1 className="text-slate-600 font-semibold">
            Click the button below to install the app on your device.
          </h1>
          <div className="flex gap-3 items-center justify-start">
            <button
              onClick={onInstall}
              className="hover:scale-105 duration-300 bg-blue-500 hover:bg-blue-600 text-white ease-in-out active:scale-95 hover:shadow-slate-400 border-2 p-2 rounded-lg"
            >
              Install App
            </button>
            <button
              onClick={onClose}
              className="hover:scale-105 bg-slate-300 duration-300 ease-in-out hover:bg-red-200 active:scale-95 hover:shadow-slate-400 border-2 p-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default PWAModal;
