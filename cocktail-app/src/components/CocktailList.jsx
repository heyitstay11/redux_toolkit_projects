import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCocktails } from "../redux/features/cocktailSlice";


const CocktailList = () => {
    const { cocktails, loading } = useSelector(state => ({...state.app}));
    const [modifiedCocktail, setModifiedCocktail] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCocktails());
    }, []);

    useEffect(() => {

        if(cocktails?.length > 0){
            const newCocktails = cocktails.map((item) => {
                const { idDrink: id, strDrink: name, strDrinkThumb: image, strAlcoholic: info , strGlass: glass } = item;
                return {id, name, image, glass, info};
            });

            setModifiedCocktail(() => newCocktails);
        }else{
            setModifiedCocktail([]);
        }

    },[cocktails]);

    if(loading){
        return(
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading ...</span>
            </div>
        )
    }

    if(!modifiedCocktail){
        return <h2 className="section-title">No Cocktail to Display</h2>
    }

    return (
       <div className="container">
           <div className="row row-cols-1 row-cols-md-3 g-4">
               {modifiedCocktail.map((item) => {
                   const {id, name, image, glass, info} = item;
                   return(
                       <div className="col" key={id}>
                           <div className="card h-2">
                               <img src={image} alt="" className="card-img-top" />
                               <div className="card-body text-left">
                                    <h5 className="card-title">{name}</h5>
                                    <h5 className="card-title">{glass}</h5>
                                    <p className="card-text">{info}</p>
                                    <Link to={'/cocktail/' + id}>
                                    <div className="btn btn-info">
                                        Details
                                    </div>
                                    </Link>
                               </div>
                           </div>
                       </div>
                   )
               })}
           </div>
       </div>
    )
}

export default CocktailList;