import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { LogIn } from "lucide-react";
import { useAuth } from "~/contexts/AuthContext";

export function LoginPrompt() {
	const { login } = useAuth();

	const handleSuccess = (credentialResponse: CredentialResponse) => {
		login(credentialResponse);
	};

	const handleError = () => {
		console.error("Login failed");
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-xl flex items-center gap-2">
					<LogIn className="h-5 w-5" />
					Sign In Required
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-[#78716c]">
					You need to sign in with your Google account to upload resources.
				</p>
				<div className="flex justify-center">
					<GoogleLogin
						onSuccess={handleSuccess}
						onError={handleError}
						theme="outline"
						size="large"
						text="signin_with"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
