import { useChangeUserOrderMutation, useGetUserOrderQuery } from "@reduxApi/userApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { orderInterFace } from "src/types/interface";
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod'
import "react-datepicker/dist/react-datepicker.css"

export const schema = z.object({
    delivery_price: z.any().optional(),
    status: z.string().optional(),
    delivery_time: z.date().nullable().optional(),
});

type OrderStatus = {
    [key: string]: string;
};

const orderStatusTranslation: OrderStatus = {
    'wait-order': 'Обработка заказа',
    'for-payment':"К оплате",
    'order-create': 'Заказ создан',
    'order-post': 'Передается в доставку',
    'in-way': 'В пути',
    'order-close': 'Доставлен',
};

const typeDeliv: Record<string, string> = {
    SelfCall: 'Самовызов'
};

export default function AdminOrderMainInfo({ order, orderClose }: { order: orderInterFace, orderClose: () => void }) {
    const [orderInfo, setOrder] = useState<orderInterFace>();
    const [deliv, setDeliv] = useState<string | null>('');

    const {  handleSubmit, formState: { errors }, control, reset } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const [putDeliveruInfo, ] = useChangeUserOrderMutation();
    const { refetch } = useGetUserOrderQuery(`my/orders/${order.profile_id}`);

    const updateInfo: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        console.log('Обновление данных:', data)
        putDeliveruInfo({ body: data, orderId: order.order_id }).then((res) => {
            if (res) {
                refetch();
                toast.success('Данные обновлены');
            }
        }).catch((err) => {
            console.error(err);
            toast.warning('Ошибка обновления данных');
        });
    };

    const dateReform = order.order_date.split('T').slice(0, 1)[0].split('-').reverse().join('.');

    useEffect(() => {
        if (order) {
            setOrder({ ...order });
            setDeliv(typeDeliv[order.delivery_type] || null); 
            reset({
                delivery_time: order.delivery_time ? new Date(order.delivery_time) : null,
                status: order.status || '',
                delivery_price: Number(order.delivery_price )|| 0
            });
        }
    }, [order, reset]);

    // useEffect(() => {
    //     if (order.delivery_time) {
    //         reset({
    //             delivery_time: new Date(order.delivery_time)
    //         });
    //     }
    // }, [order, reset]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} id={`${orderInfo && orderInfo.order_id}`}>

            <div className="admincard-wp">
                <div>Номер: №{orderInfo && orderInfo.order_id}</div>
                <div>От: {dateReform}</div>
                <div>Сатус: {orderInfo && orderStatusTranslation[orderInfo.status]}</div>
                <button className="order-details-definite" onClick={orderClose}>Закрыть</button>
            </div>

            <div style={{ display: "flex", flexDirection: 'column' }}>
                <p>Данные заказа</p>
                <div>{orderInfo?.delivery_address || 'адрес не указан'}</div>
                <div>{deliv || 'нет типа доставки'}</div>
                <div>{orderInfo?.payment || 'нет типа оплаты'}</div>
            </div>

            <form onSubmit={handleSubmit(updateInfo)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                <div className="input-MakingOrder-wp">
                    <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Дата доставки</p>
                    <Controller
                        name="delivery_time"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="dd.MM.yyyy"
                                placeholderText="дд.мм.гггг"
                                minDate={new Date(order.order_date)}
                                className="input-entry-MakingOrder-info"
                            />
                        )}
                    />
                    {errors.delivery_time && (
                        <p className="error-message">{errors.delivery_time.message}</p>
                    )}
                </div>

                <div className="input-MakingOrder-wp">
                    <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Сатус доставки</p>
                    <Controller
                        name="status"
                        control={control}
                        defaultValue={order?.status || ''}
                        render={({ field }) => (
                            <select {...field} className="input-entry-MakingOrder-info">
                                <option value={'wait-order'}>Обработка заказа</option>
                                <option value={'for-payment'}>Выставить к оплате</option>
                                <option value={'order-create'}>Заказ создан</option>
                                <option value={'order-post'}>Передается в доставку</option>
                                <option value={'in-way'}>В пути</option>
                                <option value={'order-close'}>Доставлен</option>
                            </select>
                        )}
                    />
                    {errors.status && (
                        <p className="error-message">{errors.status.message}</p>
                    )}
                </div>

                <div className="input-MakingOrder-wp">
                    <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Цена доставки</p>
                    <Controller
                        name="delivery_price"
                        control={control}
                        defaultValue={order?.delivery_price ? Number(order?.delivery_price) : 0}  // Преобразование в число
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                className="input-entry-MakingOrder-info"
                                placeholder="Введите цену доставки"
                            />
                        )}
                    />

                    {/* {errors.delivery_price && (
                        <p className="error-message">{errors.delivery_price.message}</p>
                    )} */}
                </div>

                <button type="submit">Применить</button>

            </form>
        </div>
    );
}
