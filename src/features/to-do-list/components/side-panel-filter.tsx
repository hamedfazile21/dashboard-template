import { CircleCheckBig, Diamond, ListChecks, Star, Trash2 } from 'lucide-react'
import React, { type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import type { TodoType } from '../data/todos'
import { useTodo } from './todo-provider'
import type { Dispatch } from '@reduxjs/toolkit'

interface props {
  activeItem: number
  setActiveItem: (num: number) => void
}

const SidePanelFilter: React.FC<props> = ({ activeItem, setActiveItem }) => {
  const { setOpen, todos } = useTodo()
  const { t } = useTranslation()
  return (
    <div className="card h-[calc(100vh-7rem)] w-[20%] relative">
      <div className="card-header flex items-center justify-between border-b border-borderColor">
        <h1>{t('To Do List')}</h1>
      </div>
      <div className="card-body w-full space-y-1">
        <div className="border-b border-borderColor pb-2">
          <p className="text-muted uppercase mb-1">{t('status')}</p>

          <button
            onClick={() => setActiveItem(1)}
            className={`flex group items-center justify-between w-full py-1 transition-colors duration-150 ${activeItem === 1 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
          >
            <div className="flex items-center gap-x-2">
              <ListChecks
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                size={20}
              />
              <span>{t('Inbox')}</span>
            </div>
            <span className="text-sm rounded-lg bg-surface p-1">
              {todos.length}
            </span>
          </button>
          <button
            onClick={() => setActiveItem(2)}
            className={`flex group items-center justify-between w-full py-1 transition-colors duration-150 ${activeItem === 2 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
          >
            <div className="flex items-center gap-x-2">
              <CircleCheckBig
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                size={20}
              />
              <span>{t('Done')}</span>
            </div>
            <span className="text-sm rounded-lg bg-surface p-1">
              {todos.filter((item) => item.status === 'complete').length}
            </span>
          </button>
          <button
            onClick={() => setActiveItem(3)}
            className={`flex group items-center w-full justify-between py-1 transition-colors duration-150 ${activeItem === 3 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
          >
            <div className="flex items-center gap-x-2">
              <Star
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                size={20}
              />
              <span>{t('Important')}</span>
            </div>
            <span className="text-sm rounded-lg bg-surface p-1">
              {todos.filter((item) => item.isImportant).length}
            </span>
          </button>
          <button
            onClick={() => setActiveItem(4)}
            className={`flex group items-center w-full justify-between py-1 transition-colors duration-150 ${activeItem === 4 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px] text-red-800`}
          >
            <div className="flex items-center gap-x-2">
              <Trash2
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                size={20}
              />
              <span>{t('Trash')}</span>
            </div>
            <span className="text-sm text-muted rounded-lg bg-surface p-1">
              {todos.filter((item) => item.status === 'trashed').length}
            </span>
          </button>
        </div>
        <div className="">
          <p className="text-muted uppercase mb-1 mt-3">{t('Filters')}</p>
          <button
            onClick={() => setActiveItem(5)}
            className={`flex group items-center w-full gap-x-2 py-2 transition-colors duration-150 ${activeItem === 5 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
          >
            <Diamond
              className="shrink-0 transition-transform duration-150 group-hover:scale-110 fill-emerald-500 text-emerald-500"
              size={15}
            />
            <span className="text-emerald-500">{t('Low')}</span>
          </button>
          <button
            onClick={() => setActiveItem(6)}
            className={`flex group items-center w-full gap-x-2 py-2 transition-colors duration-150 ${activeItem === 6 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
          >
            <Diamond
              className="shrink-0 transition-transform duration-150 group-hover:scale-110 fill-blue-500 text-blue-500"
              size={15}
            />
            <span className="text-blue-500">{t('Medium')}</span>
          </button>
          <button
            onClick={() => setActiveItem(7)}
            className={`flex group items-center w-full gap-x-2 py-2 transition-colors duration-150 ${activeItem === 7 ? 'bg-surface/40' : 'hover:bg-surface-hover dark:hover:bg-surface-hover/40'} px-2 rounded-lg text-[16px]`}
          >
            <Diamond
              className="shrink-0 transition-transform duration-150 group-hover:scale-110 fill-red-500 text-red-500"
              size={15}
            />
            <span className="text-red-500">{t('Hight')}</span>
          </button>
        </div>
        <div className="absolute bottom-3 w-[90%]">
          <button
            onClick={() => setOpen('create')}
            className="btn btn-primary w-full!"
          >
            {t('New Task')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SidePanelFilter
