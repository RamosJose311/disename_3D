import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ContentWrapperInfo from './ContentWrapperInfo';


function WrapperInfoInDb() {
    const [products, setproducts] = useState({
        Total:[]
    })

    useEffect( () =>  {
        async function ApiCall(url) {
            let respuesta
            respuesta = await fetch(url)
                        .then ((response) => response.json())
                        .then((respuesta)=>{
                            console.log(respuesta.data.count)
                          {
                            if(!respuesta){
                                setproducts({
                                    ...products,
                                    Total: respuesta.data
                                })
                            } else {
                                setproducts({
                                    ...products,
                                    Total: respuesta.data
                                })
                                console.log(products.data)
                            }
                          }
                        })
                        .catch(error => console.log(error))
        }
    
        ApiCall ("http://localhost:4000/api/products/")

    }, [])


    const [users, setUsers] = useState({
        Total:[]
    })

    useEffect( () =>  {
        async function ApiCall(url) {
            let respuesta
            respuesta = await fetch(url)
                        .then ((response) => response.json())
                        .then((respuesta)=>{
                            console.log("usuarios: ",respuesta.data)
                          {
                            if(!respuesta){
                                setproducts({
                                    ...users,
                                    Total: respuesta
                                })
                            } else {
                                setproducts({
                                    ...users,
                                    Total: respuesta
                                })
                                console.log(users.Total)
                            }
                          }
                        })

                        .catch(error => console.log(error))
        }
    
        ApiCall ("http://localhost:4000/api/users/")

    }, [])




  return (
    <React.Fragment>
        <div className='sipi'>
                {console.log("sera usuario", users)}
            <ContentWrapperInfo {...products.Total.Total_User} />
            <ContentWrapperInfo count = {users.Total.Total_user} />
            <ContentWrapperInfo {...products.Total} />
            


        </div>
   </React.Fragment>
  )
}

export default WrapperInfoInDb




