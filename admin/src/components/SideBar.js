import React from 'react';

import logoLetter from '../assets/images/Dise-ame-3D-7-8-2022.png';
import logoImage from '../assets/images/print3d.png'

import ContentWrapperInfo from './contentWrapper/WrapperInfo/ContentWrapperInfo';
import CategoriesInDb from './contentWrapper/Categorias/CategoriesInDb';
import WrapperInfoInDb from './contentWrapper/WrapperInfo/WrapperInfoInDb';
import WrapperProdustInDb from './contentWrapper/Products/WrapperProdustInDb';
import Footer from './Footer';




import ContentWrapper from './ContentWrapper';


function SideBar(){
    return(
        <React.Fragment>
         

    
        <input type="checkbox" id="check"/>
        <label for="check">
        <i className = "fas fa-bars" id="btn"></i>
        <i className = "fas fa-times" id="cancel"></i>
        <div id='btn1'> 
                <img className='logo'  src={logoImage} alt=""></img> 
                <img className='logo' src={logoLetter} alt=""></img> 
        </div>
        </label>
        
        <div className='sidebar1'>
            <header> 
                <img className='logo'  src={logoImage} alt=""></img> 
                <img className='logo' src={logoLetter} alt=""></img> 
            </header>
            <ul>
                <li><a href="/"><i className="fa fa-tachometer fa-lg"></i>Dashboard</a></li>
                <li><a href="http://localhost:4000"><i className="fa fa-home"></i>Home</a></li>
                <li><a href="http://localhost:4000/admin/crearProducto"><i className="fa fa-plus-circle"></i>Crear Producto</a></li>
                <li><a href="http://localhost:4000/products/reqPersonal"><i className="far fa-address-book"></i>Pedidos</a></li>

            </ul>
        </div>

        <section className='section'>
            
            
                <div className='topWarepper'>
                    
                </div>
                <div className='contentWarepper'>
                    <div className='contentWrapperInfo'>
                        <WrapperInfoInDb/>
                    </div>

                    <div className='contentWrapperProduct'>
                        <WrapperProdustInDb/>
                        
                    </div>

                    <div className='contentWrapperCategories'>
                        
                    <CategoriesInDb/>

                    </div>


                </div>
                <div className='footerWarepper'>
                    <Footer/>
                </div>

               {/*<ContentWrapper/>
               <i className = "fas fa-bars" id="btn"></i>*/}

        </section>


    </React.Fragment>
    )
}
export default SideBar; 