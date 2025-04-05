import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders, getIOrderById } from "@api/user/adminApi";
import { toast } from "react-toastify";
import AdminOrderCard from "./AdminOrderCard";
import ProdCardOrder from "./ProdCardOrder";
// import { orderInterFace } from "../../types/interface";
import { Button, TextField, Box, Stack, Paper, Typography } from "@mui/material";
import { orderInterFace } from "@pages/AccPage/Windows/pages/type";



export interface ProductInterface {
    product_id: number;
    quantity: number;
    // Добавь остальные поля
}


export default function OrdersMain() {
    const navigate = useNavigate();
    const [category, setCategory] = useState<string>('orderById');

    const orderTabs = [
        ['orderById', <OrderById />],
        ['orderByIDS', <AllOrders />],
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={2}>
                    <Button variant="contained" color="primary" onClick={() => navigate(-1)}>Назад</Button>
                    <Button variant="outlined" onClick={() => setCategory('orderById')}>Поиск заказа по ID</Button>
                    <Button variant="outlined" onClick={() => setCategory('orderByIDS')}>Вывод всех заказов</Button>
                </Stack>
                <Box>{orderTabs.find(tab => tab[0] === category)?.[1] ?? null}</Box>
            </Stack>
        </Box>
    );
}

export function OrderById() {
    const inputId = useRef<HTMLInputElement | null>(null);
    const [orderInfo, setOrder] = useState<any>({});
    const [order_id, setOrderId] = useState<number | null>(null);

    const handleChange = () => {
        const value = inputId.current?.value;
        if (value) setOrderId(Number(value));
    };

    const searchOrderId = async () => {
        if (order_id) {
            try {
                const result = await getIOrderById(order_id);
                setOrder(result);
            } catch (error) {
                toast.error('Ошибка поиска заказа, проверьте ID');
            }
        } else {
            toast.error('Проверьте ID');
        }
    };

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'row', gap: 2 , backgroundColor: '#959595'}}>
            <Stack direction="column" spacing={2} alignItems="center">
                <div style={{display:'flex',gap:10, alignItems:'center'}}>
                    <Typography>Введите ID Заказа:</Typography>
                    <TextField inputRef={inputId} onChange={handleChange} size="small" variant="outlined" />
                    <Button variant="contained" onClick={searchOrderId}>Найти</Button>
                </div>
                
                {orderInfo.order && <AdminOrderCard {...orderInfo.order} />}
            </Stack>

            
            <Stack direction="row" spacing={2} alignItems='center' flexWrap="wrap">
            {orderInfo.products && orderInfo.products.map((prod: ProductInterface) => (
                <ProdCardOrder key={prod.product_id} {...prod} />
            ))}
            </Stack>
        </Paper>
    );
}

export function AllOrders() {
    const [orders, setOrdersList] = useState<orderInterFace[]>([]);

    const getAll = async () => {
        try {
            const result = await getAllOrders();
            setOrdersList(result ?? []);
        } catch (error) {
            toast.error('Ошибка загрузки заказов');
        }
    };

    useEffect(() => {
        getAll();
        const interval = setInterval(async () => {
            const newOrders = await getAllOrders();
            setOrdersList(prevOrders => mergeOrders(prevOrders, newOrders));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const mergeOrders = (prevOrders: orderInterFace[], newOrders: orderInterFace[]): orderInterFace[] => {
        const orderMap = new Map(prevOrders.map(order => [order.order_id, order]));
        newOrders.forEach(order => {
            if (order.status !== "completed") orderMap.set(order.order_id, order);
        });
        return Array.from(orderMap.values()).filter(order => order.status !== "completed");
    };

    const sortOrders = (desc: boolean) => {
        setOrdersList(prevOrders => [...prevOrders].sort((a, b) =>
            desc ? new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
                 : new Date(a.order_date).getTime() - new Date(b.order_date).getTime()
        ));
        toast.success('Закакзы отсортированне ')
    };

    return (
        <Paper sx={{ p: 3, display: 'flex', gap: 2, backgroundColor: '#959595'}}>
            <Stack direction="row"  flexWrap="wrap" gap={2}>
                {orders.map(order => (
                    <Paper key={order.order_id} sx={{ p: 2, borderRadius: 2 }}>
                        <AdminOrderCard {...order} />
                    </Paper>
                ))}
            </Stack>

            <Stack spacing={2}>
                <Typography>Сортировка по дате:</Typography>
                <Button variant="outlined" onClick={() => sortOrders(true)}>Сначала новые</Button>
                <Button variant="outlined" onClick={() => sortOrders(false)}>Сначала старые</Button>
            </Stack>
        </Paper>
    );
}
