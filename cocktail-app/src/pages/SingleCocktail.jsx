import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleCocktail } from "../redux/features/cocktailSlice";

const SingleCocktail = () => {
    const { cocktail, loading } = useSelector((state) => ({...state.app}));
    const [modifiedCocktail, setModifiedCocktail] = useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if(id){
         dispatch(fetchSingleCocktail(id));
        }
    }, [id]);

    useEffect(() => {
        if(cocktail.length > 0){
            const {
                strDrink: name,
                strDrinkThumb: image,
                strAlcoholic: info,
                strGlass: glass,
                strInstructions: instructions,
                strCategory: category,
                strIngredient1,
                strIngredient2,
                strIngredient3,
                strIngredient4,
            } = cocktail[0];
            const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4]
            const newCocktail = { name, image, info, glass, instructions, category, ingredients};
            setModifiedCocktail(() => newCocktail);
            console.log(newCocktail);
        }else{
            setModifiedCocktail(null);
        }
    }, [id, cocktail]);

    if(!modifiedCocktail){
        return <h2 className="section-title">No Cocktail to Display</h2>
    }else{
        const { name, image, info, glass, instructions, category, ingredients}  = modifiedCocktail;

        return(
            <>
            {loading ? 
            ( <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading ...</span>
            </div>
            ) : 
            (
            <section className="section cocktail-section">
                <Link to='/'>
                    <div className="btn btn-danger mt-2">
                        Go Back
                    </div>
                </Link>
                <h2 className="section-title">{name}</h2>
                <div className="drink">
                    <img src={image} alt="" />
                    <div className="drink-info">
                        <p>
                            <span className="drink-data">Name: </span> {name}
                        </p>
                        <p>
                            <span className="drink-data">Category: </span> {category}
                        </p>
                        <p>
                            <span className="drink-data">Info: </span> {info}
                        </p>
                        <p>
                            <span className="drink-data">Glass: </span> {glass}
                        </p>
                        <p>
                            <span className="drink-data">Instructions: </span> {instructions}
                        </p>
                        <p>
                            <span className="drink-data">Ingredients: </span> 
                            {ingredients?.map((item, index) => {
                                return item ? (<span key={index}>{item}, </span>) : null
                            })
                            }
                        </p>
                    </div>
                </div>
            </section>
            )
            }
            </>
        )
    }

}

export default SingleCocktail;