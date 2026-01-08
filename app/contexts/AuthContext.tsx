import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { googleLogout } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

interface User {
	email: string;
	name: string;
	picture?: string;
}

interface AuthContextType {
	user: User | null;
	accessToken: string | null;
	isAuthenticated: boolean;
	login: (credentialResponse: CredentialResponse) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = sessionStorage.getItem("google_access_token");
		const storedUser = sessionStorage.getItem("google_user");
		
		if (storedToken && storedUser) {
			setAccessToken(storedToken);
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (credentialResponse: CredentialResponse) => {
		if (credentialResponse.credential) {
			const token = credentialResponse.credential;
			setAccessToken(token);

			const payload = JSON.parse(atob(token.split('.')[1]));
			const userData: User = {
				email: payload.email,
				name: payload.name,
				picture: payload.picture,
			};
			
			setUser(userData);
			sessionStorage.setItem("google_access_token", token);
			sessionStorage.setItem("google_user", JSON.stringify(userData));
		}
	};

	const logout = () => {
		googleLogout();
		setUser(null);
		setAccessToken(null);
		sessionStorage.removeItem("google_access_token");
		sessionStorage.removeItem("google_user");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				accessToken,
				isAuthenticated: !!user && !!accessToken,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
