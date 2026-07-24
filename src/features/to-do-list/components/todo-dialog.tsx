import { useTodo } from './todo-provider'
import CreateTodoDialog from './create-todo-dialog'

const TodoDialog = () => {
  const { open, setOpen } = useTodo()
  return (
    <>
      <CreateTodoDialog open={open} setOpen={setOpen} />
    </>
  )
}

export default TodoDialog
