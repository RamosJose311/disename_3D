import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import WarapperCategories from './WarapperCategories';


function CategoriesInDb() {
    const [products, setproducts] = useState({
        data:[]
    })

    useEffect( () =>  {
        async function ApiCall(url) {
            let respuesta
            respuesta = await fetch(url)
                        .then ((response) => response.json())
                        .then((respuesta)=>{
                          {
                            if(!respuesta){
                                setproducts({
                                    ...products,
                                    data: respuesta.data.productos
                                })
                            } else {
                                setproducts({
                                    ...products,
                                    data: respuesta.data.productos
                                })
                                console.log(products)
                            }
                          }
                        })
                        .catch(error => console.log(error))
        }
    
        ApiCall ("http://localhost:4000/api/products/")

    }, [])




    const [categories, setCategories] = useState({
        data:[]
    })

    useEffect( () =>  {
        let cat = []
        let aux = []
        {
            products.data.map((elem,index)=>{
                console.log("vamos que sale",cat)
                if(!cat.includes(elem.categories.name)){
                    cat.push(elem.categories.name)
                    aux.push(elem.categories)
                    
                }
            })
        }
        setCategories({
            data : [...aux]
        })
        
    },[])

    
  return (
    <React.Fragment>
        {categories.data.length === 0 && <p>Cargando....</p>}
        {
           categories.data.map((elem,index)=>{
            console.log("que mostras: ",elem);
            return <WarapperCategories {...elem} key = {index} />
        })
        }
   </React.Fragment>
  )
}

export default CategoriesInDb




