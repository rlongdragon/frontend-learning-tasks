export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container mx-auto px-4 flex justify-center ">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-4/12 2xl:w-1/3 bg-white shadow-lg rounded-lg p-6 mt-10 mb-10">
          {children}
        </div>
      </div>
    </>
  );
}
