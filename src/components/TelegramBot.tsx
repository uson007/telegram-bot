import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormTelegram {
  message: string;
  userName: string;
}

const TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const TelegramBot = () => {
  const { register, handleSubmit } = useForm<IFormTelegram>();

  const messageModel = (data: IFormTelegram) => {
    let messageTG = `UserName: ${data.userName}\n`;
    messageTG += `Message: ${data.message}`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      perse_mode: "html",
      text: messageModel(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("message")} type="text" placeholder="Type text..." />
      <input
        {...register("userName")}
        type="text"
        placeholder="Type you name..."
      />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default TelegramBot;
