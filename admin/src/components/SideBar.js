import React from 'react';

import logoLetter from '../assets/images/Dise-ame-3D-7-8-2022.png';
import logoImage from '../assets/images/print3d.png'

import ContentWrapperInfo from './contentWrapper/WrapperInfo/ContentWrapperInfo';
import CategoriesInDb from './contentWrapper/Categorias/CategoriesInDb';
import WrapperInfoInDb from './contentWrapper/WrapperInfo/WrapperInfoInDb';




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
                <li><a href="/"><i className="fas fa-qrcode"></i>Opcion 1</a></li>
                <li><a href="/"><i className="fas fa-link"></i>Opcion 2</a></li>
                <li><a href="/"><i className="fas fa-stream"></i>Opcion 3</a></li>
                <li><a href="/"><i className="fas fa-calendar-week"></i>Opcion 4</a></li>
                <li><a href="/"><i className="far fa-question-circle"></i>Opcion 5</a></li>
                <li><a href="/"><i className="far fa-envelope"></i>Opcion 6555</a></li>
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
                        
                        
                    </div>

                    <div className='contentWrapperCategories'>
                        
                    <CategoriesInDb/>

                    </div>


                </div>
                <div className='footerWarepper'>
                    
                </div>

               {/*<ContentWrapper/>
               <i className = "fas fa-bars" id="btn"></i>*/}

        </section>


    </React.Fragment>
    )
}
export default SideBar; 