
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/homePage';
import ProtectedRoute from './protectedRoute';
import Layout from '../components/Layout';
import AddRecommendationPage from '../pages/AddRecommendationPage';
import MyRecommendationsPage from '../pages/MyRecommendationsPage';
import EditRecommendationPage from '../pages/editRecommendationPage';
import RequestSponsorshipPage from '../pages/requestSponsorshipPage';
import FavoritesPage from '../pages/favoritesPage';
import AdminRoute from './adminRoute';
import AdminLayout from '../components/adminLayout';
import SponsorshipPage from '../pages/sponsorshipPage';
import CategoriesPage from '../pages/categoriesPage';
import UsersPage from '../pages/usersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: 'home',
                element: <HomePage />,
              },
              {
                path: 'recommendations/new',
                element: <AddRecommendationPage />,
              },
              { path: 'my-recommendations',
               element: <MyRecommendationsPage /> 
              },
              { path: 'recommendations/:id/edit',
                element: <EditRecommendationPage/>
              },
              { path: 'recommendations/:id/sponsorship',
                element: <RequestSponsorshipPage />
              },
              { path: 'favorites',
                element: <FavoritesPage />
              },
              {
                element:<AdminRoute/>,
                children:[
                  {
                    element:<AdminLayout/>,
                    path:'admin',
                    children:[
                      {
                           index: true,
                           element: <Navigate to="sponsorships" replace />,
                      },
                      {
                        path:'sponsorships',
                        element:<SponsorshipPage/>
                      },
                      {
                        path:'categories',
                        element:<CategoriesPage/>
                      },
                      {
                        path:'users',
                        element:<UsersPage/>
                      }

                    ]
                  }
                ]
              }

            ],
          },
        ],
      },
    ],
  },
]);

export default router;

