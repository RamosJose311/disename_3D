import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import WrapperProduct from './WrapperProduct';

function WrapperProdustInDb() {
    const [products, setproducts] = useState({
        data:[]
    })

    useEffect( () =>  {
       const ApiCall = async (url) => {
                const resp = await fetch(url)
                const data = await resp.json()
                console.log("Lo podre ver de nuevo",data.data.productos)
                {
                    if(data.data.productos.length === 0){
                        setproducts({
                            ...products,
                            data: data.data.productos
                        })
                    } else {
                        setproducts({
                            ...products,
                            data: data.data.productos
                        })
                        
                    }
                  }
            }
    
        ApiCall ("http://localhost:4000/api/products/")
    }, [])
    
     return (
    <React.Fragment>
        
        {products.data.length === 0 && <p>Cargando....</p>}
        {products.data.length !== 0 && <WrapperProduct imagen = {products.data[products.data.length-1].images[0].url} 
                                                       description = {products.data[products.data.length-1].description}
                                                       id = {products.data[products.data.length-1].id}  />}
            

   </React.Fragment>
  )
}

export default WrapperProdustInDb
