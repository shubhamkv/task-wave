import { useAuthContext } from "../../context/AuthContext";

const Header = () => {
  const { userName } = useAuthContext();
  const quote = "Small steps every day lead to big results.";

  return (
    <div className="mb-6 dark:bg-red-400">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Good Morning, {userName} 👋
      </h1>
      <p className="text-md text-gray-600 dark:text-gray-300 italic mt-1">
        {quote}
      </p>
    </div>
  );
};

export default Header;
