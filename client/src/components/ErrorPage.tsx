import { HashLoader } from "react-spinners";

function ErrorPage() {
  return (
    <div className="min-h-[90vh] flex justify-center items-center gap-3 flex-col px-4  w-full">
      <h1 className="text-xl">Uh-Oh, Nothing To See Here!</h1>
      <h1 className="text-2xl">
        The page you requested doesn't exist. Please try a different direction.
      </h1>
      <HashLoader
        speedMultiplier={1}
        className="w-full"
        size={70}
        color="#36d7b7"
      />
    </div>
  );
}

export default ErrorPage;
