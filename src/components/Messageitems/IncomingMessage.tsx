import React from "react";

type Props = {
  message: string;
};

function IncomingMessage(props: Props) {
  return (
    <div className="bg-slate-200 my-1 self-start max-w-3xl rounded-lg p-2 text-sm text-slate-800">
      {props.message}
    </div>
  );
}

export default IncomingMessage;
