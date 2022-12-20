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
            console.log("Lo podre ver",data.data.productos)
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
                    console.log("esto estoy viendo aaa",products)



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
                            console.log("usuarios AAA: ",respuesta.data.Users.length)
                            console.log("usuarios BBB: ",respuesta.data)
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

     

    let Users ={
        titulo: "Usuarios en Base de Datos",
        color: "primary",
        cifra : users.Total.Total_User,
        icono : "fa-sharp fa-solid fa-users"
    }
    
    let Products ={
        titulo: "Productos en Base de Datos",
        color: "success",
        cifra : products.Total.length,
        icono : "fa-solid fa-cubes"
    }
    
    let Categories ={
        titulo: "Categorias Activas en Base de Datos",
        color: "info",
        cifra : 8,
        icono : "fa-solid fa-list"
    }
    
    let CardsList = [Users,Products,Categories]



  return (
    <React.Fragment>
        

        {
       CardsList.map( (card,index) => {
        return <ContentWrapperInfo key={index} {...card}/>
        }
        )
      }

        
   </React.Fragment>
  )
}

export default WrapperInfoInDb




