const Paginator = ({
  to,
  of,
  totalItem,
  onClickPrev,
  onClickNext,
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center absolute bottom-0 left-[50%] translate-x-[-50%] w-full lg:scale-[1.1] ${className}`}
    >
      {/* <!-- Help text --> */}
      <span className="text-sm text-gray-300 font-medium">
        Showing <span className="font-semibold text-white">{to}</span> to{" "}
        <span className="font-semibold text-white">{of}</span> of{" "}
        <span className="font-semibold text-white">{totalItem}</span> Cities
      </span>
      {/* <!-- Buttons --> */}
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={onClickPrev}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Prev
        </button>
        <button
          onClick={onClickNext}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Paginator;
