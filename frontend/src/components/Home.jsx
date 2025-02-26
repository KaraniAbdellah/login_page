import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
    // Verfiy If The User Has A Token
    const navigate = useNavigate();
    useEffect(() => {
        if (document.cookie == "") {
            navigate("/login");
        }
    }, []);

    return (
        <h1 className="font-semibold text-4xl">Comming Soon</h1>
    );
}
