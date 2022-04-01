import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './UserPost';
import CreatePost from './UserPost/CreatePost';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}  />
          <Route path='/createPost' element={<CreatePost />}  />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
