import {Routes,Route} from 'react-router-dom'
import Home from './pages/HomePage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Policy } from './pages/Policy';
import { PageNotFound } from './pages/PageNotFound';
import Register from './pages/auth/register';
import Login from './pages/auth/Login';
import { Dashboard } from './pages/user/dashboard';
import PrivateRoute from './components/Routes/private';
import ForgotPassword from './pages/auth/forgotPassword';
import AdminRoute from './components/Routes/adminRoute';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/profile';
import Order from './pages/user/orders';
function App() {

  return (
   <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/forgotPassword" element={<ForgotPassword/>} />
      <Route path="/register" element={<Register/>}/>
       <Route path="/dashboard" element={<PrivateRoute/>}>
       <Route path="user" element={<Dashboard/>}/>
       <Route path="user/profile" element={<Profile/>}/>
       <Route path="user/orders" element={<Order/>}/>

       </Route>
       <Route path="/dashboard" element={<AdminRoute/>}>
       <Route path="admin" element={<AdminDashboard/>}/>
       <Route path="admin/create-category" element={<CreateCategory/>}/>
       <Route path="admin/create-product" element={<CreateProduct/>}/>
       <Route path="admin/users" element={<Users/>}/>
       </Route> 
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="*" element={<PageNotFound/>}/>

     </Routes>
   </>
  );
}

// * means if all the routes before * if we didn't get them then only this route execute

export default App;
