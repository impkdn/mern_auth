import './App.css';
import Header from './components/Header-components/Header';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import LogIn from './components/Header-components/LogIn/LogIn';

//  **a page for 404 error
import NoPage from "./pages/NoPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/Sigunup';

function App() {
  // return (
  //   <div className="app">
  //     <header className="app-header">
  //       <Header></Header>
  //     </header>
  //   </div>
  // );
  return (
    <BrowserRouter>
      <Routes>

      
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path='home' element= {<Home/>}/>
          <Route path='login' element = {<Login/>}/>
          <Route path='signup' element = {<SignUp/>}/>
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
