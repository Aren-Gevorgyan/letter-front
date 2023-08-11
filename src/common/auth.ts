import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "./firebaseInit";

export const registration = async (email: string, password: string) => {
  try {
    createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.log(error.message);
  }
};
