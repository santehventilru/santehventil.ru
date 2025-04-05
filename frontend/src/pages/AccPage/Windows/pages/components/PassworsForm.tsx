import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { passwordValid } from "@shared/utils/valid";
import { changePasswordApi } from "@api/user/profile-api";
import { useSelector } from "react-redux";
import { RootState } from "@toolkit/store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PasswordForm() {
  const infoUserArray = useSelector((state: RootState) => state.autoriseSlice.userInfo);

  const infoUser = infoUserArray.reduce((acc: Record<string, any>, item:{key:string, value:string}) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  const id = Number(infoUser["id"]);

  const schema = z
    .object({
      id: z.number(),
      currentPassword: z.string().min(8, "Минимум 6 символов"),
      newPassword: z.string().min(8, "Минимум 8 символов"),
      confirmNewPassword: z.string().min(8, "Минимум 8 символов"),
    })
    .superRefine((data, ctx) => {
      if (!passwordValid(data.newPassword)) {
        ctx.addIssue({
          code: "custom",
          message: "Пароль должен содержать цифры и спецсимволы",
          path: ["newPassword"],
        });
      }
      if (data.newPassword !== data.confirmNewPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Пароли не совпадают",
          path: ["confirmNewPassword"],
        });
      }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
      });
      

  // Устанавливаем `id` при изменении пользователя
  useEffect(() => {
    setValue("id", id);
  }, [id, setValue]);

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      const result = await changePasswordApi(data);
      if (!result) {
        toast.error('Ошибка обновления пароля')
        return;
      }else{
        toast.success('Данные обновлены')
      }
      
    } catch (error) {
      toast.warning("Ошибка при смене пароля")
      console.error("Ошибка при смене пароля", error);
    }
  };

  return (
    <div className="heading-text-pers-info-wp">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="info-passwor-form-wp info-passwor-form-wp-active"
      >
        <div className="ferst-pers-info-wp">
          <div className="input-pers-info-wp">
            <p className="inuput-pers-info-name">Старый пароль</p>
            <input
              type="password"
              {...register("currentPassword")}
              className="input-entry-pers-info"
              placeholder="Введите старый пароль"
            />
            {errors.currentPassword && (
              <p className="error-message">{errors.currentPassword.message}</p>
            )}
          </div>

          <div className="input-pers-info-wp">
            <p className="inuput-pers-info-name">Новый пароль</p>
            <input
              type="password"
              {...register("newPassword")}
              className="input-entry-pers-info"
              placeholder="Должны быть цифры и спец символы"
            />
            {errors.newPassword && (
              <p className="error-message">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="input-pers-info-wp input-pers-info-wp-no-bottom">
            <p className="inuput-pers-info-name">Введите еще раз новый пароль</p>
            <input
              type="password"
              {...register("confirmNewPassword")}
              className="input-entry-pers-info"
              placeholder="Введите еще раз новый пароль"
            />
            {errors.confirmNewPassword && (
              <p className="error-message">{errors.confirmNewPassword.message}</p>
            )}
          </div>
        </div>

        <button className="button button-pers-info--save" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
}
