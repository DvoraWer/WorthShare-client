
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { register as registerUser } from '../api/authApi';
import useUser from '../hooks/useUser';
import type { RegisterRequest } from '../types/auth';

const schema = yup.object({
  fullName: yup.string().trim().required('חובה להזין שם מלא').max(100, 'השם יכול להכיל עד 100 תווים'),
  email: yup.string().required('חובה להזין כתובת אימייל').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'כתובת האימייל אינה תקינה'),
  password: yup.string().required('חובה להזין סיסמה').min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים').max(25, 'הסיסמה יכולה להכיל עד 25 תווים'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterRequest>(
    {
      mode: 'onSubmit',
      resolver: yupResolver(schema),
      defaultValues:
      {
        fullName: '',
        email: '',
        password: '',
      },
    });

  const onSubmit = async (data: RegisterRequest) => {
    setServerError('');
    try {
      const response = await registerUser(data);
      localStorage.setItem('accessToken', response.accessToken);
      setUser(response.user);
      navigate('/home', { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setServerError('כתובת האימייל כבר נמצאת במערכת.');
        } else if (error.response?.status === 400) {
          setServerError('אחד הפרטים שהוזנו אינו תקין.');
        } else {
          setServerError('ההרשמה נכשלה-נסה שוב.');
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>הרשמה ל-WorthShare</h2>
      <div>
        <label htmlFor="fullName">שם מלא</label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          {...register('fullName')}
        />
        {errors.fullName && (
          <p role="alert">{errors.fullName.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">אימייל</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
        />
        {errors.email && (
          <p role="alert">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">סיסמה</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register('password')}
        />
        {errors.password && (
          <p role="alert">{errors.password.message}</p>
        )}
      </div>

      {serverError && (
        <p role="alert">{serverError}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'בתהליך הרשמה...' : 'יצירת חשבון'}
      </button>
    </form>
  );
}

export default RegisterForm;
