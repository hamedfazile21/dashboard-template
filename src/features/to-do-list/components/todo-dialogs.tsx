import { useTodo, type TodoDialogType } from './todo-provider'
import CreateTodoDialog from './create-todo-dialog'
import DetailsTodoDialog from './details-todo.dialog'

const TodoDialog = () => {
  const { open, setOpen, currentRow } = useTodo()
  return (
    <>
      <CreateTodoDialog
        key={'todo-create'}
        open={open === 'create'}
        setOpen={() => setOpen('create')}
      />

      <CreateTodoDialog
        key={`todo-update-${currentRow?.id}`}
        open={open === 'update'}
        setOpen={() => setOpen('update')}
        currentRow={currentRow}
      />

      <DetailsTodoDialog
        key={`todo-details`}
        open={open === 'details'}
        setOpen={() => setOpen('details')}
        currentRow={currentRow}
      />
    </>
  )
}

export default TodoDialog
