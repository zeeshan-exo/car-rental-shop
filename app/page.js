import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-black text-white min-h-screen flex flex-col justify-center">
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Expo</h1>
          <p className="mb-6">Let's explore with us this page</p>
          <button className="px-6 py-2 rounded-md font-bold bg-gray-700 text-white hover:text-gray-600 hover:bg-white transition duration-300 ease-in-out">
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
