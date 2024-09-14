export const selectMessage = (state) => state.feedback.message;
export const selectType = (state) => state.feedback.type;
export const selectIsLoading = (state) => state.feedback.isLoading;
export const selectApiStatus = (state) => state.feedback.apiStatus;

export const selectFeedbackStates = (state) => state.feedback;
