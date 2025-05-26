import { SliderComponentMain } from "@pages/MainPage/type";
import { questioListInterface } from "@shared/type";

export const DESKTOP_BREAKPOINT = 481;

export const FILTER_BREAKPOINT  = 991

export const ARRY_SLIDER : SliderComponentMain[] = [
    {
        idSlider: 's1',
        textHeader: 'Все для ванной',
        textSlider: 'Хочешь стильную ванную?/Самое время для обновления — скидки, быстрая доставка./Закажи ванну и начни менять пространство!',
        path: '/product/catalog',
        textBtn: 'Поехали',
        imgRef: '/img/santexMain3t.png',
    },

    {
        idSlider: 's2',
        textHeader: 'Выгодно',
        textSlider: 'Класная ванная двано мечатли ?/Тогда пора задуматься о жизни бро/Купи ванну и думай о жизни сколько захочешь!!!',
        path: '/product/catalog',
        textBtn: 'Поехали',
        imgRef: '/img/santexMainBg6.png',
    },
    {
        idSlider: 's3',
        textHeader: 'Выгодно',
        textSlider: 'Класная ванная двано мечатли ?/Тогда пора задуматься о жизни бро/Купи ванну и думай о жизни сколько захочешь!!!',
        path: '/product/catalog',
        textBtn: 'Поехали',
        imgRef: '/img/santeMainBg22.png',
    },
    {
        idSlider: 's4',
        textHeader: 'Все для ванной',
        textSlider: 'Класная ванная двано мечатли ?/Тогда пора задуматься о жизни бро/Купи ванну и думай о жизни сколько захочешь!!!',
        path: '/product/catalog',
        textBtn: 'Поехали',
        imgRef: '/img/santexMain3t.png',
    },
]

export const SLIRDER_ROUND = [
    {
        slideIndex:0
    },
    {
        slideIndex:1
    },
    {
        slideIndex:2
    },
    {
        slideIndex:3
    }
]

export const LI_NAV = [
    {
        text: 'Доставка',
        link:'/shippingInformation',
    },
    {
        text: 'Бренды',
        link:'/brand',
    },
    {
        text: 'Контакты',
        link:'/contats',
    },
]

export const SREVICE_LT: questioListInterface[]= [
    {
        id:'Сопровождение',
        headeText:'Сопровождение',
        mainText:'Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. ',

    },
    {
        id:'Реализация',
        headeText:'Реализация',
        mainText:'Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. ',
    },
    {
        id:'Расчет',
        headeText:'Расчет',
        mainText:'Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. Вот так вот. ',
    }
]