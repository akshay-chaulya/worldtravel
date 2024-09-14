import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../features/ui/feedbackSlice";
import { selectFeedbackStates } from "../../features/ui/feedbackSelectors";
import { OverlayContainer } from "../";

const GlobalMessage = () => {
  const { type, message } = useSelector(selectFeedbackStates); // Use actual values from Redux
  const dispatch = useDispatch();

  // const [modalOpen, setModalOpen] = useState(false);

  // const handleOkBtnClick = () => {
  //   setModalOpen(false);
  //   dispatch(clearNotification());
  // };

  // useEffect(() => {
  //   if (type && type !== "info" && type !== "api down" && message)
  //     setModalOpen(true); // Open modal if there's a notification

  //   if (type === "info") setModalOpen(false);
  // }, [type, message]);

  return (
    <OverlayContainer
      status={message && (type === "error" || type === "success")}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => dispatch(clearNotification())}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center flex flex-col items-center">
            <svg
              className={`mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {type === "error" && (
              <h1 className="text-red-500 dark:text-gray-400 text-3xl mb-2">
                Error
              </h1>
            )}
            {type === "success" && (
              <h1 className="text-green-500 dark:text-gray-400 text-3xl mb-2">
                Success
              </h1>
            )}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            {(type === "error" || type === "success") && (
              <button
                onClick={() => dispatch(clearNotification())}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Ok
              </button>
            )}
          </div>
        </div>
      </div>
    </OverlayContainer>
  );
};

export default GlobalMessage;
