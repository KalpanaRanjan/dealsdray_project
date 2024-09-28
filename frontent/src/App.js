import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EmployeeAdd from './components/employee/EmployeeAdd';
import EmployeeView from './components/employee/EmployeeView';
import EmployeeEdit from './components/employee/EmployeeEdit';
import EmployeeList from './components/employee/EmployeeList';
import Home from './components/common/Home';
import Login from './components/common/Login';
import Signup from './components/common/Signup';
function App() {
  return (
    <>
           <BrowserRouter>
             <Routes>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
             <Route path='/home' element={<Home />} />
             <Route path='/employeelist' element={<EmployeeList/>}></Route>
             <Route path='/employeeadd' element={<EmployeeAdd/>}></Route>
             <Route path='/employeeedit/:f_id' element={<EmployeeEdit/>}></Route>
             <Route path='/employeeView' element={<EmployeeView/>}></Route>
             </Routes>
           </BrowserRouter>
    </>
  );
}

export default App;
