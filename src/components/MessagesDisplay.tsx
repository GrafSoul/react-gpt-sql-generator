import MessageDisplay from "./MessageDisplay";

interface userMessage {
  role: string;
  content: string;
}

interface MessagesDisplayProps {
  userMessages: userMessage[];
}
const MessagesDisplay = ({ userMessages }: MessagesDisplayProps) => {
  return (
    <div className="messages-display">
      {userMessages.map((message, index) => (
        <MessageDisplay key={`message-${index}`} message={message} />
      ))}
    </div>
  );
};

export default MessagesDisplay;
