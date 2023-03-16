import {app} from '../firebase-config';
import {getFirestore, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';

const db = getFirestore(app)
const userCollectionRef = collection(db, 'users');
class UserDataService{
    // addBooks = (newBook) => {
    //     return addDoc(bookCollectionRef, newBook);
    // }
    // updateBook = (id, updatedBook) => {
    //     const bookDoc = doc(db, "books", id);
    //     return updateDoc(bookDoc, updatedBook);
    // }
    // deleteBook = (id) => {
    //     const bookDoc = doc(db, "books", id);
    //     return deleteDoc(bookDoc);
    // }
    getAllUsers = () => {
        return getDocs(userCollectionRef);
    }
    getUserRole = (id) => {
        const userDoc = doc(db, "users", id);
        console.log(userDoc);
        return getDoc(userDoc);
    }
}

export default new UserDataService();