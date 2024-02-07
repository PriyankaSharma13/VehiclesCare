import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface User {
  uid: string;
  email: string;
  displayName?: string | null;
}

interface AuthModule {
  registerUser: (username: string, email: string, password: string, dateOfBirth: Date) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<User>;
  getCurrentUser: () => User | null;
}


const registerUser = async (username: string, email: string, password: string, dateOfBirth: Date) => {
  try {
    if (!username || !email || !dateOfBirth || !password) {
      console.error("Enter data");
      return;
    }

    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
   
    await userCredential.user?.updateProfile({
      displayName: username,
    }); 

    await firestore().collection('users').doc(userCredential.user.uid).set({
      username,
      email,
      dateOfBirth: dateOfBirth.toISOString(), 
    });

    console.log('User account created & signed in!');
  } catch (error:any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Email address is already in use!');
    } else {
      console.error(error);
    }
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      console.log('Invalid password');
    } else if (error.code === 'auth and user notfound') {
      console.log('User not found');
    } else {
      console.error(error);
    }
    throw error;
  }
};

const getCurrentUser: AuthModule['getCurrentUser'] = () => {
  const user = auth().currentUser;
  return user ? user.toJSON() as User : null;
};

const Auth = {
  registerUser,
  loginUser,
  getCurrentUser
};

export default Auth;
