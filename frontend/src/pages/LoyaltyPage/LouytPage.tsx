// import loylotyImg from '@img/loyloty567.jpg'
// import ItemServList from '../../acrticlePages/ItemServList'
import DropDownItem from './ui/DropDownItem'
import { useState } from 'react'
import LaylotyBox from '@shared/ui/LaylotyBox'
import ServList from './ui/SreverList'
import { SREVICE_LT } from '@shared/constants/constants'



export default function LoytuPage(){

    const [active, setActive] =useState('')
    

    const hadelClick = (item:string) => {
        setActive(item)
    }


   

    return <>
        <section id="loyalotyProgramm">
            <div className="container container-promo">
                <div className='lt-ferst-wp'>
                    <div className='lt-ferst-descr-wp'>
                        <h1>Наша программа 
                        Лояльности</h1>
                        <p>Расширяйте свои возможности вместе с 
                        нами.</p>
                        <button className="btn btnLoyloty" >Получить консультацию</button>
                        {/*кнопка по центру бьлока все отсальное в край*/}
                    </div>
                    <div className='ltBoxCont'>
                        <LaylotyBox style={{
                            width:'100%',
                            // maxWidth:'50%'
                        }}/>
                    </div>
                </div>
            </div>

            <div className="container container-lt">

                <div className='service-wp'>
                    <h2 className='lt-heading'>Наши услуги</h2>
                    <div style={{overflowX:'scroll',scrollbarWidth:'none', width:'100%', alignSelf:'center'}}>
                        <div className='service-list-wp'>
                            <article className='service-list-item'>
                                <h3 className='heading-serv-cart'>
                                    Сопровождение 
                                    объекта
                                </h3>
                                <ServList text={'Какие-то преимущества'}/>
                                <ServList text={'Какие-то преимущества'}/>
                                <ServList text={'Какие-то преимущества'}/>
                            </article>
                            <article className='service-list-item'>
                                <h3 className='heading-serv-cart'>Реализация 
                                объекта</h3>
                                <ServList text={'Какие-то преимущества'}/>
                                <ServList text={'Какие-то преимущества'}/>
                                <ServList text={'Какие-то преимущества'}/>
                            </article>
                            <article className='service-list-item'>
                                <h3 className='heading-serv-cart'>Полный расчет 
                                объекта</h3>
                                <ServList text={'Какие-то преимущества'}/>
                                <ServList text={'Какие-то преимущества'}/>
                                <ServList text={'Какие-то преимущества'}/>
                            </article>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className='question-main'>
                    <h3 className='lt-heading'>
                    Основные вопросы
                    </h3>

                    <div className='list-questions-wp'>
                        {SREVICE_LT.map(item => <DropDownItem key={item.id} {...item} active={active} onClick={ () => hadelClick(item.id)}/>)}
                    </div>
                </div>

            </div>

            <div className="container">
                <h3 className='lt-heading'>
                    Заполните форму для оставления заявки
                </h3>
                <div className='lt-form-wp'>
                    <form className="inputs-makingOrder-main-container lt-form-wp" >
                        <div className="input-MakingOrder-wp inputs-lt-wp">
                            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Имя Фамилия</p>
                            <input  type="text"  className="input-lt " id="inputName" placeholder="Введите ваше имя" required  minLength={4}/>
                            {/* {errors.first_name && (
                            <p className="error-message">{errors.first_name.message}</p>
                            )} */}
                        </div>
                        <div className="input-MakingOrder-wp inputs-lt-wp">
                            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Email</p>
                            <input  type="text"  className="input-lt " id="inputName" placeholder="Введите ваше имя" required  minLength={4}/>
                            {/* {errors.first_name && (
                            <p className="error-message">{errors.first_name.message}</p>
                            )} */}
                        </div>
                        <div className="input-MakingOrder-wp inputs-lt-wp">
                            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Номер телефона</p>
                            <input  type="text"  className="input-lt " id="inputName" placeholder="Введите ваше имя" required  minLength={4}/>
                            {/* {errors.first_name && (
                            <p className="error-message">{errors.first_name.message}</p>
                            )} */}
                        </div>
                        <div className="input-MakingOrder-wp inputs-lt-wp">
                            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Имя</p>
                            <input  type="text"  className="input-lt " id="inputName" placeholder="Введите ваше имя" required  minLength={4}/>
                            {/* {errors.first_name && (
                            <p className="error-message">{errors.first_name.message}</p>
                            )} */}
                        </div>
                        <button className='btn-lt-req'>Отправить</button>
                    </form>
                </div>
            </div>

        </section>
    </>
}
