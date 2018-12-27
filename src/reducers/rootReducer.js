const initState = {
  tracks: []
};

const rootReducer = (state = initState, action) => {
  if (action.type === "UPDATE_TRACKS") {
    return {
      ...state,
      tracks: action.tracks
    };
  } else {
    return state;
  }
};

export default rootReducer;
