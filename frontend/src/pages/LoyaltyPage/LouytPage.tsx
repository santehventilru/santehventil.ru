import { useRef } from 'react'
import LaylotyBox from '@shared/ui/LaylotyBox'
import ServList from './ui/SreverList'
import ServiceDescr from './components/ServiceDescr'





export default function LoytuPage(){

    const formRef = useRef<HTMLDivElement>(null)
    const handleNav =  () => {
        if(formRef.current){
            const position = formRef.current.getBoundingClientRect()
            console.log(position)
            window.scrollTo({top:position.y - 60 , behavior:'smooth'})
        }
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
                        <button className="btn btnLoyloty" onClick={handleNav}>Получить консультацию</button>
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
                                    Сопровождение<br/>
                                    объекта
                                </h3>
                                <ServList text={'Контроль работ'}/>
                                <ServList text={'Инженерная поддержка'}/>
                                <ServList text={'Экономия времени'}/>
                            </article>
                            <article className='service-list-item'>
                                <h3 className='heading-serv-cart'>Реализация<br/>
                                объекта</h3>
                                <ServList text={'Полный цикл работ'} />
                                <ServList text={'Контроль качества'} />
                                <ServList text={'Гибкий подход'} />
                            </article>
                            <article className='service-list-item'>
                                <h3 className='heading-serv-cart'>Полный расчет<br/>
                                объекта</h3>
                                <ServList text={'Расчёт без визита'}/>
                                <ServList text={'Готовая смета за 1–2 дня'}/>
                                <ServList text={'Можно с работой или без'}/>
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
                    <ServiceDescr/>
                </div>

            </div>

            <div className="container" ref={formRef}>
                <h3 className='lt-heading'>
                    Заполните форму для оставления заявки
                </h3>
                <div className='lt-form-wp' >
                    <form className="inputs-makingOrder-main-container lt-form-wp" >
                        <div className="input-MakingOrder-wp inputs-lt-wp">
                            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Имя Фамилия</p>
                            <input  type="text"  className="input-lt " id="inputName" placeholder="Имя Фамилия" required  minLength={4}/>
                            {/* {errors.first_name && (
                            <p className="error-message">{errors.first_name.message}</p>
                            )} */}
                        </div>
                        <div className="input-MakingOrder-wp inputs-lt-wp">
                            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Email</p>
                            <input  type="text"  className="input-lt " id="inputName" placeholder="Ваш Email" required  minLength={4}/>
                            {/* {errors.first_name && (
                            <p className="error-message">{errors.first_name.message}</p>
                            )} */}
                        </div>
                        <div className="input-MakingOrder-wp inputs-lt-wp">
                            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Номер телефона</p>
                            <input  type="text"  className="input-lt " id="inputName" placeholder="+7 (xxx) xxx xx xx" required  minLength={4}/>
                            {/* {errors.first_name && (
                            <p className="error-message">{errors.first_name.message}</p>
                            )} */}
                        </div>
                        <div className="input-MakingOrder-wp inputs-lt-wp">
                            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Название услуги</p>
                            <input  type="text"  className="input-lt " id="inputName" placeholder="Введите название услуги" required  minLength={4}/>
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
