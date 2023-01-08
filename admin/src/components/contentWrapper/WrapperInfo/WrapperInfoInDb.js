import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ContentWrapperInfo from './ContentWrapperInfo';


function WrapperInfoInDb() {
    const [products, setproducts] = useState({
        Total:[]
    })

    useEffect( () =>  {
        const ApiCall = async (url) => {
            const resp = await fetch(url)
            const data = await resp.json()
            console.log("Info Lo podre ver",data.data.productos)
            {
                if(data.data.productos.length === 0){
                    setproducts({
                        ...products,
                        Total: data.data.productos
                    })
                } else {
                    setproducts({
                        ...products,
                        Total: data.data.productos
                    })
                    



                }
              }
        }

    ApiCall ("http://localhost:4000/api/products/")

    }, [])


    const [users, setUsers] = useState({
        Total:[]
    })

    useEffect( () =>  {
        const ApiCall = async (url) => {
            const response = await fetch(url)
            const respuesta = await response.json()
                            console.log("Info usuarios AAA: ",respuesta.data.Users.length)
                            console.log("Info usuarios BBB: ",respuesta.data)
                            {
                            if(respuesta.data.Users.length === 0){
                                setUsers({
                                    ...users,
                                    Total: respuesta.data
                                })
                            } else {
                                setUsers({
                                    ...users,
                                    Total: respuesta.data
                                })
                                console.log(users.Total)
                            }
                          }
        }
        ApiCall ("http://localhost:4000/api/users/")
    }, [])


    const [categories, setCategories] = useState({
        data:[]
    })

    useEffect( () =>  {
        let cat = []
        let aux = []
        {
            products.Total.map((elem,index)=>{
                
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
       
    },[products])


    let Users ={
        titulo: "Usuarios en Base de Datos",
        fontColor: "primary",
        color: "secondary",
        cifra : users.Total.Total_User,
        icono : "fa-sharp fa-solid fa-users"
    }
    
    let Products ={
        titulo: "Productos en Base de Datos",
        fontColor: "primary",
        color: "secondary",
        cifra : products.Total.length,
        icono : "fa-solid fa-cubes"
    }
    
    let Categories ={
        titulo: "Categorias Activas en Base de Datos",
        fontColor: "primary",
        color: "secondary",
        cifra : categories.data.length,
        icono : "fa-solid fa-list"
    }
   
    let CardsList = [Users,Products,Categories]

  return (
    <React.Fragment>
        {
            CardsList.map( (card,index) =>  <ContentWrapperInfo key={index} {...card}/>
        
        )
      }
   </React.Fragment>
  )
}

export default WrapperInfoInDb




