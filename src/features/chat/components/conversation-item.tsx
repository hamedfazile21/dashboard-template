import type { Conversation } from '../data/chat-data'

const ConversationItem = ({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation
  active: boolean
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-x-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
        active ? 'bg-primary/15' : 'hover:bg-surface-hover'
      }`}
    >
      <div className="relative shrink-0">
        <img
          src={conversation.avatar}
          alt=""
          className="h-11 w-11 rounded-full object-cover"
        />
        {conversation.online && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-x-2">
          <span
            className={`truncate text-sm ${active ? 'font-semibold text-primary' : 'font-medium text-foreground'}`}
          >
            {conversation.name}
          </span>
          <span className="shrink-0 text-[11px] text-muted">
            {conversation.time}
          </span>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <span className="truncate text-xs text-muted">
            {conversation.lastMessage}
          </span>
          {conversation.unread > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export default ConversationItem
