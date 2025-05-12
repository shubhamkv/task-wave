import { useAuthContext } from "../../context/AuthContext";

const Header = () => {
  const { userName } = useAuthContext();
  const quote = "Small steps every day lead to big results.";

  return (
    <div className="mb-6 pl-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Welcome, {userName}
      </h1>
      <p className="text-md text-gray-800 dark:text-white italic mt-1">
        {quote}
      </p>
    </div>
  );
};

export default Header;
