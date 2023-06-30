import React, { lazy } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baselightTheme } from "./theme/DefaultColors";

import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Loadable from './layouts/full/shared/loadable/Loadable';

import { Suspense } from 'react';
import jwtDecode from 'jwt-decode';
import { setUser } from './redux/actions/authActions';
import store from './redux/store';
import { useSelector } from 'react-redux';
import PrivateRouter from './Service/PriveteRouter';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('./layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('./layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('./views/dashboard/Dashboard')))
const Profil = Loadable(lazy(() => import('./views/Profils/Profil')))
const Users = Loadable(lazy(() => import('./views/utilities/TypographyPage')))
const Produits = Loadable(lazy(() => import('./views/utilities/Produits')))
const Orders = Loadable(lazy(() => import('./views/utilities/Orders')))
const Error = Loadable(lazy(() => import('./views/authentication/Error')));
const Register = Loadable(lazy(() => import('./views/authentication/Register')));
const Login = Loadable(lazy(() => import('./views/authentication/Login')));
const Category = Loadable(lazy(() => import('./views/category/Category')));
const ProductsDemo = Loadable(lazy(() => import('./views/category/ProductsDemo')));
const Chatting = Loadable(lazy(() => import('./chating/Chatting')));
const Contact = Loadable(lazy(() => import('./views/utilities/Contact')));
const Command = Loadable(lazy(() => import('./views/utilities/Command')));
if(localStorage.jwt){
  const decode = jwtDecode(localStorage.jwt)
  store.dispatch(setUser(decode))
}
function App() {
  const theme = baselightTheme;
  const auth = useSelector(state => state.auth)
  const user = {
    isConnected: "false",
    
  }
  return (
    <Suspense>
    <BrowserRouter>
    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <Routes>
          <Route
            path="/"
            element={ <FullLayout user={user} />}
          >  
         
            <Route path="/" element={
           <PrivateRouter>
            <Dashboard />
            </PrivateRouter>
          } />
            <Route path="/dashboard" element={ <Dashboard /> } />
            <Route path="/profil" element={   
            <Profil />       
        } />
            <Route path="/stock" element={<ProductsDemo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/users" element={
            <Users />
          } />
            <Route path="/produits" element={<Produits />} />
            <Route path="/command" element={<Command />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/category" element={<Category />} />
            <Route path="/chatting" element={<Chatting />} />
            <Route path="*" element={<Navigate to="/auth/404" />} />
          </Route>
          <Route path="/auth" element={<BlankLayout />}>
            <Route path="404" element={<Error />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/auth/404" />} />
          </Route>
        </Routes>
        
      </ThemeProvider>
  
    </BrowserRouter>
  </Suspense>
  );
}

export default App;
