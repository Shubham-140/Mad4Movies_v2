import { handleLogout } from "./AuthSlice";
import { resetPersonalMovieData } from "./MovieDetailsSlice";

export function logoutUser() {
  return (dispatch) => {
    dispatch(handleLogout());
    dispatch(resetPersonalMovieData());
  };
}
