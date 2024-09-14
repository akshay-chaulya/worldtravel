const ProfileLogo = ({
  height = "9",
  width = "9",
  className,
  url,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 ${className}`}
    >
      <img
        className={`h-9 w-9 h-${height} w-${width} rounded-full`}
        src={
          url ||
          "http://res.cloudinary.com/dpwssfhtz/image/upload/v1725058336/m7jzttsqkglkvcecfjzb.png"
        }
        alt="user photo"
      />
    </button>
  );
};

export default ProfileLogo;
