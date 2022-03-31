import Home from './pages/Home';
import SingleCocktail from './pages/SingleCocktail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import store from './redux/store';
import { Provider } from 'react-redux'

const App = () => {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cocktail/:id' element={<SingleCocktail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;