import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {
    // states here
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loginLoader, setLoginLoader] = useState(true)
    const [googleLoginLoader, setGoogleLoginLoader] = useState(true)
    const [registerLoader, setRegisterLoader] = useState(true)

    // sign in with google
    const provider = new GoogleAuthProvider()
    const signInWithGoogle = () => {
        setGoogleLoginLoader(true)
        return signInWithPopup(auth, provider)
    }

    // creating user by email and password
    const createUser = (email, password) => {
        setRegisterLoader(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login user with email and pass
    const loginUser = (email, password) => {
        setLoginLoader(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // update user while creating
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    }

    // logout user
    const userLogout = () => {
        setLoading(true)
        return signOut(auth)
    }

    // observer here
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser?.email) {
                    const { data } = await axios.post("https://my-assignment-11-server-pi.vercel.app/jwt", {
                        email: currentUser.email
                    }, { withCredentials: true });


                    console.log("Token:", data);
                } else {
                    const { data } = await axios.get("https://my-assignment-11-server-pi.vercel.app/logout", { withCredentials: true });
                    console.log(data);
                }
            } catch (error) {
                console.error("Error in observer:", error);
            } finally {
                setUser(currentUser);
                setLoading(false);
                setLoginLoader(false);
                setRegisterLoader(false);
                setGoogleLoginLoader(false);
            }
        });

        return () => unSubscribe();
    }, []);


    const authInfo = {
        signInWithGoogle,
        user,
        setUser,
        loading,
        setLoading,
        loginLoader,
        setLoginLoader,
        registerLoader,
        setRegisterLoader,
        googleLoginLoader,
        setGoogleLoginLoader,
        userLogout,
        createUser,
        updateUser,
        loginUser
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthContextProvider;