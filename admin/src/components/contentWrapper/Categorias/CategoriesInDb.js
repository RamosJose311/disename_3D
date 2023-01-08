import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import WarapperCategories from './WarapperCategories';


function CategoriesInDb() {

      const [products, setproducts] = useState({
        data:[]
    })

    useEffect( () =>  {
       const ApiCall = async (url) => {
                const resp = await fetch(url)
                const data = await resp.json()
                console.log("Lo podre ver",data.data.productos)
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
                        console.log("esto estoy viendo",products)

                        
                    }
                  }

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

        setCategories({
            ...categories,
            data : [...aux]
        })
        }
        
    },[])

   
const aux1 = categories.data.length
    
  return (
    <React.Fragment>

        {categories.data.length === 0 && <p>Cargando....</p>}
        {console.log("Que pasa con aux1",aux1)}
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




