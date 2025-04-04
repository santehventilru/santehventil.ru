import { toast } from "react-toastify";
import { orderInterFace } from "../../types/interface";
import { Button, Typography, Box, Paper, IconButton, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function AdminOrderCard({
  delivery_time,
  delivery_type,
  order_date,
  order_id,
  profile_id,
  status,
  total_price
}: orderInterFace) {

  // const delivType = {
  //   1: 'Самовызов',
  //   2: 'Доставка',
  //   3: 'Транспорт линия'
  // };

  // const deliveryTypeString = delivType[delivery_type as keyof typeof delivType] || 'Не определено';

  const [isEditing, setIsEditing] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(delivery_time ? new Date(delivery_time) : null);

  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  // };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Время доставки обновлено!');
  };

  const copyToClipboard = (text: string, mes: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success(mes))
      .catch(err => console.error("Ошибка копирования: ", err));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Paper sx={style.orderItem}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1">ID Заказа - {order_id}</Typography>
          <IconButton onClick={() => copyToClipboard(String(order_id), 'ID заказа скопирован')}>
            <ContentCopyIcon sx={{ color: '#EAE0E0' }} />
          </IconButton>
        </Box>
        <Typography variant="body2">Заказ от - {order_date.slice(0, 10).split('-').reverse().join('.')}</Typography>
      </Paper>
        
      <Paper sx={style.orderItem}>
        <Typography variant="body1">Время доставки - {delivery_time ? delivery_time : 'не определено'}</Typography>
        <Button variant="outlined" size="small" onClick={() => setIsEditing(!isEditing)}>Изменить</Button>
        {isEditing && (
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#234234',
              borderRadius: 2,
              boxShadow: 3,
              padding: 3,
              zIndex: 100,
              width: '300px',
              minHeight: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2">Выберите дату доставки:</Typography>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    disablePast
                    format="dd.MM.yyyy"
                    openTo="day"
                    slotProps={{
                    textField: {
                        fullWidth: true,
                        sx: { backgroundColor: '#ffffff' },
                    },
                    }}
                />
                </LocalizationProvider> */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleSave}>Сохранить</Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>Отмена</Button>
            </Stack>
          </Box>
        )}
      </Paper>

      <Paper sx={style.orderItem}>
        <Typography variant="body1">Способ доставки - {delivery_type}</Typography>
      </Paper>

      <Paper sx={style.orderItem}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1">ID Клиента - {profile_id}</Typography>
          <IconButton onClick={() => copyToClipboard(String(profile_id), 'ID клиента скопирован')}>
            <ContentCopyIcon sx={{ color: '#EAE0E0' }} />
          </IconButton>
        </Box>
      </Paper>

      <Paper sx={style.orderItem}>
        <Typography variant="body1">Статус заказа - {status}</Typography>
        <Button variant="outlined" size="small">Изменить</Button>
      </Paper>

      <Paper sx={style.orderItem}>
        <Typography variant="body1">Финальная цена - {total_price}</Typography>
      </Paper>
    </Box>
  );
}

const style = {
  orderItem: {
    padding: 2,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#234234',
    borderRadius: 2,
    boxShadow: 3,
    position: 'relative',
  }
};
