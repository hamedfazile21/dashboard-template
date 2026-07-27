import Input from '#/components/input'
import { useDeferredValue, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { todoData, type TodoType } from './data/todos'
import TodoRow from './components/todo-row'
import SidePanelFilter from './components/side-panel-filter'
import { TodoProvider, useTodo } from './components/todo-provider'
import TodoDialog from './components/todo-dialogs'
import Pagination from '#/components/pagination'
import EmptyTodos from './components/empty-todo'

const FILTERS: Record<number, (item: TodoType) => boolean> = {
  1: () => true,
  2: (item) => item.status === 'complete',
  3: (item) => item.isImportant,
  4: (item) => item.status === 'trashed',
  5: (item) => item.priority === 'Low',
  6: (item) => item.priority === 'Medium',
  7: (item) => item.priority === 'High',
}

function TodoList() {
  const [activeItem, setActiveItem] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const delaySearch = useDeferredValue(search)

  const { page, setPage, totalPage, paginateData, setOpen } = useTodo()

  const { t } = useTranslation()
  const mapData = paginateData.filter(FILTERS[activeItem] ?? (() => true))
  const variantProps: 'all' | 'completed' | 'important' | 'trashed' | 'search' =
    activeItem === 1
      ? 'all'
      : activeItem === 2
        ? 'completed'
        : activeItem === 3
          ? 'important'
          : 'trashed'

  return (
    <>
      <div className="w-full flex items-stretch gap-x-2">
        <SidePanelFilter
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <div className="card relative flex h-[calc(100vh-7rem)] w-[80%] flex-col p-0!">
          {/* Header — fixed, doesn't scroll */}
          <div className="card-header m-0! flex shrink-0 items-center justify-between border-b border-borderColor p-2 rounded-t-xl">
            <div className="w-1/3">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder={t('Search To Do')}
              />
            </div>
          </div>

          <div className="card-body w-full flex-1 overflow-y-auto">
            {mapData.length === 0 ? (
              <EmptyTodos
                onAddTask={() => setOpen('create')}
                variant={variantProps}
              />
            ) : (
              mapData.map((item, index) => (
                <TodoRow
                  key={item.id ?? index}
                  rowKey={index + 1}
                  setActiveItem={setActiveItem}
                  item={item}
                />
              ))
            )}
          </div>

          {/* Footer — fixed, doesn't scroll */}
          <div className="card-footer w-full shrink-0 p-3 flex! items-end! justify-end! border-b border-borderColor rounded-b-xl">
            <Pagination
              currentPage={page}
              totalPages={totalPage}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
      <TodoDialog />
    </>
  )
}

export default TodoList
