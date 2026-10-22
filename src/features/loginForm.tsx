
import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../api/authApi';
import useUser from '../hooks/useUser';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await login({
        email,
        password,
      });
      localStorage.setItem('accessToken', response.accessToken);
      setUser(response.user);
      navigate('/home');
    } catch {
      setErrorMessage('ההתחברות נכשלה. בדקי את פרטי ההתחברות ונסי שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>התחברות</h2>

      <div>
        <label htmlFor="email">אימייל</label>

        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label htmlFor="password">סיסמה</label>

        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'מתחבר...' : 'התחברות'}
      </button>
    </form>
  );
}

export default LoginForm;
