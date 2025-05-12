export const Newsletter = () => {
  return (
    <div className="px-6 py-16 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Stay in the Loop
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Subscribe to our newsletter and get productivity tips, updates, and
          exclusive offers.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-3 rounded-md text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};
