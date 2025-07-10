import Image from "next/image";

function Loading() {
  return (
    <div className="absolute inset-0 w-full h-full z-50">
      <div className="w-full h-full bg-white opacity-60 absolute inset-0" />
      <div className="flex flex-col justify-center w-full h-full items-center relative z-10">
        <div className="flex items-center">
          <Image
            src="/elogo-logo.svg"
            alt="Logo"
            width={80}
            height={80}
            className="animate-bounce"
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
