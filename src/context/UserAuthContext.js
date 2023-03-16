import {createContext, useEffect, useState, useContext} from "react";
import{
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import {auth, db} from "../firebase-config";
import {doc, setDoc, getDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const userAuthContext = createContext();


export function UserAuthContextProvider({children}) {
    
    const [user, setUser] = useState("");
    async function signUp(email, password, role){
        const infoUser = await createUserWithEmailAndPassword(
            auth,
            email,
            password).then((userFirebase) => {
                return userFirebase;
            });
            console.log(infoUser);
            const docuRef = doc(db,`users/${infoUser.user.uid}`);
            setDoc(docuRef, {email: email, role: role});
    }
    function logIn(email, password){
        console.log(email);
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logOut(){
        return signOut(auth);
    };
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }
    async function getRole(uid){
        const docuRef =doc(db, `users/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data().role;
        return infoFinal;
    }
    const navigate = useNavigate();
    function setUserWithFirebaseAndRole(userFirebase){
        getRole(userFirebase.uid).then((role) => {
            const userData = {
                uid: userFirebase.uid,
                email: userFirebase.email,
                role: role,
            };
            setUser(userData);
            console.log("user data:", userData.role);
            if (userData.role === "Admin"){
                navigate('/addbook');
            }else{
                navigate('/login');
            }
            
        });      
    }
    onAuthStateChanged(auth, (userFirebase) =>{
        if (userFirebase){
            if (!user){
                setUserWithFirebaseAndRole(userFirebase);
            }
        }else{
            setUser(null);
        }
    }); 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);
    return <userAuthContext.Provider value={{user, signUp, logIn, logOut, googleSignIn}}>{children}</userAuthContext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthContext);
}