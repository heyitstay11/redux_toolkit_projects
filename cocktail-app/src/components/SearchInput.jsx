import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchCocktails } from '../redux/features/cocktailSlice';
import './search.css';

const SearchInput = () => {
    const searchValue = useRef();
    const dispatch = useDispatch();

    const handleChange = () => {
      const searchText = searchValue.current.value;
      dispatch(fetchSearchCocktails(searchText));
    }

    return (
        <section className="section search">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="name">Search Cocktail</label>
          <input
            type="text"
            name="name"
            id="name"
            ref={searchValue}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
    )
}

export default SearchInput;