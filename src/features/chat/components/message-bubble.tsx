import { Check, CheckCheck } from 'lucide-react'
import type { Message } from '../data/chat-data'

const MessageBubble = ({ message }: { message: Message }) => {
  const isMe = message.senderId === 'me'

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex max-w-[70%] flex-col gap-y-1 ${isMe ? 'items-end' : 'items-start'}`}
      >
        {message.type === 'image' ? (
          <img
            src={message.imageUrl}
            alt=""
            className="max-w-70 rounded-2xl border border-black/8 object-cover dark:border-white/10"
          />
        ) : (
          <div
            className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              isMe
                ? 'rounded-br-md bg-primary text-white'
                : 'glass-solid rounded-bl-md text-foreground'
            }`}
          >
            {message.text}
          </div>
        )}
        <div className="flex items-center gap-x-1 px-1">
          <span className="text-[11px] text-muted">{message.time}</span>
          {isMe && message.status === 'read' && (
            <CheckCheck size={13} className="text-primary" />
          )}
          {isMe && message.status === 'delivered' && (
            <CheckCheck size={13} className="text-muted" />
          )}
          {isMe && message.status === 'sent' && (
            <Check size={13} className="text-muted" />
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
