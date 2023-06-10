import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/AuthContext'
import { ProductsContext } from '../../../context/ProductsContext';
import RecommendedProducts from '../../resources/Cards/Recommended/RecommendedProducts';
import styles from '../../home/Recommended/RecommendedList.module.css'
import { useNavigate } from 'react-router-dom';
import ProductsService from '../../../shared/services/ProductsService';

const FavList = () => {

    const user = useContext(UserContext)
    const [favProds, setFavProducts] = useState(null);
    const navigate = useNavigate();
    const [products, setProducts] = useState()

    
    const verFavs = () => {
        const algo = []
        
        user.favs.forEach( favId => {
            const parcial = products.filter( p => {
                p.id === favId;
            });
            algo.push(parcial[0])
        })
        setFavProducts(algo)
    }
    
    const fetchProds = async () => {
        var prods = await ProductsService.getAll()
        setProducts(prods)
        verFavs();
    }

    useEffect( () => { 
        fetchProds();
    }, [user.favoritos] )

  return (
    <div>
        <h2>
            Tus productos favoritos
        </h2>
        {favProds ? favProds.map( product => {
            <div
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            className={styles.linkCard}
          >
            <RecommendedProducts
              rentalType="Alquiler por hora"
              product={{
                ...product,
                name: product.name,
                price: product.price,
                ratings: product.ratings,
                image: product.imageURL,
              }}
            //   categoryIcon={
            //     isIconInSportsIcons ? IconComponent : categoryIcon
            //   }
            />
          </div>
        }) : "No tienes ningún favorito" }
    </div>
  )
}

export default FavList