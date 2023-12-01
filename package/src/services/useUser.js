
import { useQuery } from "@tanstack/react-query";
import { currentUser } from "../utils/tokenUtils";
function useUser() {
  const {
		isLoading,
		data: user,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: currentUser,
	});
	// console.log("user", user);
	// console.log(user.role);
	return {
		isLoading,
		user,
		error,
		isAuthenticated: user?.is_active === '1',
	};
}
export default useUser;
