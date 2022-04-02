import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import Info from "./pages/Info";
import { store } from "./store";
// import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
   <>
    <Provider store={store}>
      <BrowserRouter>
      {/* <ToastContainer> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addContact' element={<AddEdit/>} />
          <Route path='/editContact/:id' element={<AddEdit />} />
          <Route path='/info/:id' element={<Info />} />
        </Routes>
      {/* </ToastContainer> */}
      </BrowserRouter>
    </Provider>
   </>
  )
}

export default App;
