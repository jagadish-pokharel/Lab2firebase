import { signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase'
console.log("DEBUG - Token:", localStorage.getItem("token"));
console.log("DEBUG - Email:", localStorage.getItem("userEmail"));
const Dashboard = () => {
    const navigate = useNavigate();
    // 1. Create a state to hold the username
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const checkToken = () => {
            const userToken = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail"); // Retrieve email

            if (userToken) {
                console.log("User is valid");
                
                // 2. Logic to extract the name from email
                if (userEmail) {
                    // split('jaggu@gmail.com') -> ["jaggu", "gmail.com"] -> take index [0]
                    const name = userEmail.split('@')[0];
                    setUserName(name);
                }
            }
            else {
                console.log("User is not valid");
                navigate("/");
            }
        }
        checkToken();
    }, [navigate]);

    const logoutuser = async () => {
        try {
            await signOut(auth);
            // 3. Clear all user data on logout
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            navigate("/");
        } catch (error: any) {
            console.log("Error msg: ", error.message);
            alert(error.message);
        }
    }

return (
    <div className="container mt-5">
        <div className="card p-4 shadow-sm text-center">
            <h1 className="mb-4">Hello, <span className="text-primary text-capitalize">{userName || "User"}</span>!</h1>
            
            <div className="alert alert-info">
                You are successfully logged in to your dashboard.
            </div>

            {/* Portfolio Link Addition */}
            <div className="my-4">
                <p>Welcome to my Firebase Lab. You can see jagadish pokharel portfolio other projects here:</p>
                <a href="https://jagadishpokharel58.com.np" target="_blank" className="btn btn-success">
                    View Portfolio
                </a>
            </div>

            <div className="mt-2">
                <button className="btn btn-danger" onClick={logoutuser}>
                    Logout
                </button>
            </div>
        </div>
        
        {/* Footer Credit */}
        <div className="text-center mt-3">
            <small className="text-muted">© 2026 Lab Project</small>
        </div>
    </div>
)
    
}

export default Dashboard;