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
<<<<<<< HEAD
                console.log("Lo podre ver",data.data.productos)
=======
>>>>>>> develop
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
<<<<<<< HEAD
                        console.log("esto estoy viendo",products)

                        
                    }
                  }

=======
                    }
                  }
>>>>>>> develop
            }
    
        ApiCall ("http://localhost:4000/api/products/")

    }, [])

    const [categories, setCategories] = useState({
        data:[]
    })

<<<<<<< HEAD

=======
>>>>>>> develop
    useEffect( () =>  {
        let cat = []
        let aux = []
        {
            products.data.map((elem,index)=>{
<<<<<<< HEAD
                console.log("vamos que sale",cat)
=======
>>>>>>> develop
                if(!cat.includes(elem.categories.name)){
                    cat.push(elem.categories.name)
                    aux.push(elem.categories)
                }
                
            })

<<<<<<< HEAD

=======
>>>>>>> develop
        setCategories({
            ...categories,
            data : [...aux]
        })
        }
        
<<<<<<< HEAD
    },[])

   
const aux1 = categories.data.length
=======
    },[products])

   

>>>>>>> develop
    
  return (
    <React.Fragment>

        {categories.data.length === 0 && <p>Cargando....</p>}
<<<<<<< HEAD
        {console.log("Que pasa con aux1",aux1)}
=======

>>>>>>> develop
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




