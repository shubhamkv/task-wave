import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const Docs = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      {/* Main Content - centered */}
      <div className="flex-grow dark:from-gray-900 dark:via-gray-950 dark:to-black bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-300 flex flex-col items-center justify-center px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 drop-shadow-sm dark:text-white">
          API Documentation
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Swagger UI Section */}
          <div className="dark:bg-gray-800 bg-slate-200 rounded-2xl shadow-lg p-6 border border-gray-200 transition-transform hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2 dark:text-blue-500">
              Swagger UI
            </h2>
            <p className="text-gray-800 dark:text-white mb-4">
              Interactive API documentation for developers. Test endpoints
              directly from the browser.
            </p>
            <a
              href="https://task-wavee-api-docs.netlify.app/swagger-ui.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Open Swagger UI
            </a>
          </div>

          {/* Redoc Section */}
          <div className="bg-slate-200 dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 transition-transform hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold text-red-600 mb-2 dark:text-red-500">
              Redoc
            </h2>
            <p className="text-gray-800 dark:text-white mb-4">
              Clean, readable API reference ideal for clients and
              non-developers.
            </p>
            <a
              href="https://task-wavee-api-docs.netlify.app/redoc.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Open Redoc
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
