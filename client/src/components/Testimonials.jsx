export const Testimonials = () => {
  return (
    <div className="px-6 py-16  dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Testimonials
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Testimonial 1 */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] dark:bg-gray-800 dark:text-white">
          <p className="italic text-gray-700 dark:text-gray-300 relative pl-8">
            <span className="absolute left-0 top-0 text-3xl text-pink-500 dark:text-pink-400">
              “
            </span>
            Task Wave helped me finally stick to my daily goals. The focus
            sessions and streaks keep me motivated like never before.
          </p>
          <h3 className="mt-4 text-lg font-semibold text-right text-gray-800 dark:text-white">
            — Sanu Verma
          </h3>
        </div>

        {/* Testimonial 2 */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] dark:bg-gray-800 dark:text-white">
          <p className="italic text-gray-700 dark:text-gray-300 relative pl-8">
            <span className="absolute left-0 top-0 text-3xl text-pink-500 dark:text-pink-400">
              “
            </span>
            The focus timer has reduced my distractions significantly. I get
            more done in less time now.
          </p>
          <h3 className="mt-4 text-lg font-semibold text-right text-gray-800 dark:text-white">
            — Rina Sinha
          </h3>
        </div>

        {/* Testimonial 3 */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] dark:bg-gray-800 dark:text-white">
          <p className="italic text-gray-700 dark:text-gray-300 relative pl-8">
            <span className="absolute left-0 top-0 text-3xl text-pink-500 dark:text-pink-400">
              “
            </span>
            I never thought productivity could feel this rewarding. I actually
            look forward to hitting my focus streaks. Highly recommended!
          </p>
          <h3 className="mt-4 text-lg font-semibold text-right text-gray-800 dark:text-white">
            — Sudhir Kumar
          </h3>
        </div>
      </div>
    </div>
  );
};
