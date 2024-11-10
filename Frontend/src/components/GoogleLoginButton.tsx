import { Button } from '@mui/material';
import { signInWithGoogle } from '../firebaseConfig';
import { User } from 'firebase/auth'; 

interface GoogleLoginProps {
  onLoginSuccess: (user: User) => void; 
}

const GoogleLoginButton = ({ onLoginSuccess }: GoogleLoginProps) => {
  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) onLoginSuccess(user); 
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Login with Google
    </Button>
  );
};

export default GoogleLoginButton;
