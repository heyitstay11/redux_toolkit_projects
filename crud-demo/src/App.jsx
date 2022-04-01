import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './UserPost';
import CreatePost from './UserPost/CreatePost';
import store from './redux/store';

const App = () => {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}  />
          <Route path='/createPost' element={<CreatePost />}  />
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
