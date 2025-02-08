import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 bg-[url('/bgCar.png')] bg-cover bg-center bg-no-repeat">

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-lg text-white drop-shadow-lg">
          <h1 className="text-5xl font-bold mb-4 text-start">Welcome to Expo</h1>
          <p className="mb-6 text-xl text-start text-gray-200">Let's explore with us this page</p>
          <button className="px-6 py-2 rounded-md font-bold bg-gray-700 text-white hover:bg-gray-100 hover:text-gray-800 transition duration-300 ease-in-out focus:ring-2 focus:ring-gray-500 shadow-md">
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
