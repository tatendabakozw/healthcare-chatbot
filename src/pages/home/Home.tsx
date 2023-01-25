import { ReactElement, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import OutGoingMessage from "@components/Messageitems/OutGoingMessage";
import IncomingMessage from "@components/Messageitems/IncomingMessage";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { v4 as uuid } from "uuid";

type Props = {};

const Home = (props: Props): ReactElement => {
  const [loading, setLoading] = useState(false);
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const [message, setMessage] = useState<any>({
    message: "",
    sent_by_user: false,
  });
  const [messages, setMessages] = useState<any>([
    // { message: "Iam not feeling well", id: 21, sent_by_user: true },
    // { message: "What are you feeling?", id: 21, sent_by_user: false },
    // { message: "Iam a felling a slight headache", id: 21, sent_by_user: true },
    // {
    //   message:
    //     "We propose taking some pain killers while on you way to see a doctor",
    //   id: 21,
    //   sent_by_user: false,
    // },
  ]);

  const send_message_Handler = async () => {
    try {
      setLoading(true);
      setMessages((old_messages: any) => [...old_messages, message]);
      const { data } = await axios.post(`${apiUrl}/send/message`, {
        userText: message.message,
        userId: small_id,
      });
      console.log(data.response[0].queryResult.fulfillmentText);
      setMessages((old_messages: any) => [
        ...old_messages,
        {
          message: data.response[0].queryResult.fulfillmentText,
          sent_by_user: false,
        },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="grid min-h-screen  md:p-8 p-2 bg-slate-100">
      <div className="rounded-lg relative px-4 bg-white mx-auto max-w-5xl w-full shadow">
        <div className="heading w-full">
          <p className="  text-center p-4 text-lg text-slate-700 font-semibold">
            Appex Medical helper
          </p>
        </div>
        {/* chat items */}
        <div className="flex flex-col w-full">
          <IncomingMessage message="Hello. I'm Madeline " />
          <IncomingMessage message="How may I assist you today?" />
          {messages?.map((message: any, index: number) => (
            <>
              {message.sent_by_user ? (
                <OutGoingMessage key={index} message={message.message} />
              ) : (
                <IncomingMessage key={index} message={message.message} />
              )}
            </>
          ))}
        </div>
        {/* chat input */}
        <div className="absolute bottom-5 px-4 md:right-5 right-2 md:left-5 left-2 bg-slate-200 rounded-full flex flex-row items-center">
          <input
            type="text"
            onChange={(e) =>
              setMessage({ message: e.target.value, sent_by_user: true })
            }
            className="p-2 bg-slate-200 rounded-full flex-1 outline-none border-none"
            placeholder="Enter Message"
          />
          <div onClick={send_message_Handler} className="flex text-slate-700">
            <PaperAirplaneIcon height={20} width={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
