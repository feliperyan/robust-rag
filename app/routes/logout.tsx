import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";

export default function Logout() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// Call the AuthContext logout which handles:
		// - googleLogout() from @react-oauth/google
		// - Clearing sessionStorage
		// - Resetting auth state
		logout();
		
		// Redirect to home after logout
		navigate("/ai-compendium", { replace: true });
	}, [logout, navigate]);

	return null;
}
