import loylotyImg from '@img/loyloty567.jpg'
import ItemServList from './ItemServList'
import DropDownItem from './DropDownItem'
import { useState } from 'react'

interface questioListInterface{
    id:string,
    headeText:string,
    mainText:string
}

export default function LoytuPage(){

    const [active, setActive] =useState('')

    const hadelClick = (item:string) => {
        setActive(item)
    }


    const questioLis: questioListInterface[]= [
        {
            id:'Сопровождение',
            headeText:'Что? Сопровождение',
            mainText:'Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. ',

        },
        {
            id:'Реализация',
            headeText:'Что? Реализация',
            mainText:'Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. ',
        },
        {
            id:'Расчет',
            headeText:'Что? Расчет',
            mainText:'Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. ',
        }
    ]

    return <main>
        <section id="loyalotyProgramm">
            <div className="container">
                <div className='lt-ferst-wp'>
                    <div className='lt-ferst-descr-wp'>
                        <h1>Наша программа 
                        Лояльности</h1>
                        <p>Расширяйте свои возможности вместе с 
                        нами.</p>
                        <button className="btn" >Получить консультацию</button>
                        {/*кнопка по центру бьлока все отсальное в край*/}
                    </div>
                    <div>
                        <img src={loylotyImg} alt={'фото программы лояности'} />
                    </div>
                </div>
            </div>

            <div className="container container-lt">

                <div className='service-wp'>
                    <h2 className='lt-heading'>Наши услуги</h2>
                    <div className='service-list-wp'>
                        <article className='service-list-item'>
                            <h3 className='heading-serv-cart'>
                                Сопровождение 
                                объекта
                            </h3>
                            <ItemServList text={'Какие-то преимущества'}/>
                            <ItemServList text={'Какие-то преимущества'}/>
                            <ItemServList text={'Какие-то преимущества'}/>
                        </article>
                        <article className='service-list-item'>
                            <h3 className='heading-serv-cart'>Реализация 
                            объекта</h3>
                            <ItemServList text={'Какие-то преимущества'}/>
                            <ItemServList text={'Какие-то преимущества'}/>
                            <ItemServList text={'Какие-то преимущества'}/>
                        </article>
                        <article className='service-list-item'>
                            <h3 className='heading-serv-cart'>Полный расчет 
                            объекта</h3>
                            <ItemServList text={'Какие-то преимущества'}/>
                            <ItemServList text={'Какие-то преимущества'}/>
                            <ItemServList text={'Какие-то преимущества'}/>
                        </article>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className='question-main'>
                    <h3 className='lt-heading'>
                    Основные вопросы
                    </h3>

                    <div className='list-questions-wp'>
                        {questioLis.map(item => <DropDownItem key={item.id} {...item} active={active} onClick={ () => hadelClick(item.id)}/>)}
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
    </main>
}
