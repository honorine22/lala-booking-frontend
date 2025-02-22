"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const GoogleAuthHandler = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = searchParams.get("token");
        const user = searchParams.get("user");

        if (token && user) {
            // Store token & user in cookies
            Cookies.set("authToken", token, { expires: 7, secure: true });
            Cookies.set("loggedInUser", decodeURIComponent(user), { expires: 7, secure: true });

            // Retrieve previous page from localStorage
            const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/";

            // Clear stored URL
            localStorage.removeItem("redirectAfterLogin");

            // Redirect back to the original page
            router.push(redirectUrl);
        } else {
            console.error("Authentication failed: Missing token or user data.");
        }

        setLoading(false);
    }, [searchParams, router]);

    return <div>{loading ? <p>Authenticating...</p> : <p>Redirecting...</p>}</div>;
};

export default GoogleAuthHandler;
