import { useAppSelector } from '#/hooks/redux'

const Dashboard = () => {
  const { counter } = useAppSelector((state) => state.dashboard)
  return (
    <div>
      <div className=''>{counter}</div>
    </div>
  )
}

export default Dashboard
