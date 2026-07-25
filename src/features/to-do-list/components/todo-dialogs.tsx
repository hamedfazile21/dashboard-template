import { useTodo } from './todo-provider'
import CreateTodoDialog from './create-todo-dialog'

const TodoDialog = () => {
  const { open, setOpen , currentRow } = useTodo()
  return (
    <>
      <CreateTodoDialog key={'todo-create'} open={open} setOpen={setOpen} />
    </>
  )
}

export default TodoDialog
