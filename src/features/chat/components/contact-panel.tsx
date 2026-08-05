import { MoreVertical, Plus, Search } from 'lucide-react'
import React, {
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import ConversationItem from './conversation-item'
import { conversations } from '../data/chat-data'
import { useTranslation } from 'react-i18next'

interface props {
  activeId: string
  setActiveId: Dispatch<SetStateAction<string>>
}

const ContactPanel: React.FC<props> = ({ activeId, setActiveId }) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const filteredConversations = useMemo(
    () =>
      conversations.filter((conversation) => {
        const normalizedQuery = query.trim().toLowerCase()
        if (!normalizedQuery) return true

        return [conversation.name, conversation.lastMessage]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      }),
    [query],
  )

  return (
    <div className="flex w-80 shrink-0 flex-col ltr:border-r rtl:border-l border-black/8 dark:border-white/10 relative">
      <div className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-lg font-semibold text-foreground">{t('Chats')}</h2>
        <button className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="px-4 pt-3">
        <div className="flex items-center gap-x-2 rounded-lg bg-surface-hover px-3 py-2">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search conversations') ?? ''}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-2 flex-1 space-y-1 overflow-y-auto scrollbar-thin px-2 pb-2">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((c) => (
            <ConversationItem
              key={c.id}
              conversation={c}
              active={c.id === activeId}
              onClick={() => setActiveId(c.id)}
            />
          ))
        ) : (
          <div className="rounded-xl p-4 text-sm text-muted">
            {t('No conversations match your search.')}
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactPanel
