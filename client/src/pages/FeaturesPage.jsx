import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import firstFeature from "../assets/first-feature.jpg";
import secondFeature from "../assets/second-feature.jpg";
import thirdFeature from "../assets/third-feature.svg";
import { CheckCircle2, ListChecks, Timer, Filter } from "lucide-react";

const features = [
  {
    title: "Task Management",
    icon: ListChecks,
    description: [
      "Easily create, update, and delete your daily tasks.",
      "Track each task's progress and maintain control effortlessly.",
      "Organize your day with clarity and precision.",
    ],
    image: firstFeature,
  },
  {
    title: "Focus Sessions & Streaks",
    icon: Timer,
    description: [
      "Enter deep work mode with a built-in timer.",
      "Earn streaks on successful task completion.",
      "Build consistency and gamify your productivity.",
    ],
    image: secondFeature,
  },
  {
    title: "Smart Filters",
    icon: Filter,
    description: [
      "Filter tasks based on status, priority, and deadlines.",
      "Find exactly what you need without the clutter.",
      "Stay focused by viewing only what matters.",
    ],
    image: thirdFeature,
  },
];

export const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-16 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-300 dark:from-gray-900 dark:via-gray-950 dark:to-black">
        <h2 className="text-4xl font-bold text-center mb-20 text-gray-800 dark:text-white">
          Explore Our Features
        </h2>

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 mb-24 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-2xl shadow-2xl max-w-xs sm:max-w-sm md:max-w-md"
                />
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="space-y-5 max-w-md">
                  <h3 className="text-3xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <Icon
                      className="text-blue-700 dark:text-blue-400"
                      size={28}
                    />
                    {feature.title}
                  </h3>
                  <ul className="space-y-4">
                    {feature.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className="text-green-800 mt-1"
                          size={20}
                        />
                        <p className="text-lg text-gray-900 dark:text-gray-300 leading-relaxed">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
};
