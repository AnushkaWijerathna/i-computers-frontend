export default function AboutUs() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center">
        About Us
      </h1>
      <p className="max-w-xl text-center text-gray-700 text-lg leading-relaxed mb-6">
        Welcome to our platform! We strive to provide the best services to our
        users, connecting people with what they need seamlessly and efficiently.
        Your satisfaction is our top priority.
      </p>
      <div className="flex space-x-4">
        <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition">
          Learn More
        </button>
        <button className="px-6 py-2 bg-white border border-indigo-600 text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition">
          Contact Us
        </button>
      </div>
    </div>
  );
}
