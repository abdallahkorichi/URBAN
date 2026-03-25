import { useNavigate } from "react-router-dom";

function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonLink,
}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-md w-full border">

        {Icon && (
          <div className="flex justify-center mb-4 text-primary">
            <Icon size={48} />
          </div>
        )}

        <h2 className="text-xl font-bold mb-2">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {description}
        </p>

        {buttonText && (
          <button
            onClick={() => navigate(buttonLink)}
            className="w-full bg-primary text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
