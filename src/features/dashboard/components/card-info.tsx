import {
  DollarSign,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'
import React from 'react'

const stats = [
  {
    label: 'Total Revenue',
    value: '$42,580',
    change: '+12.4%',
    up: true,
    icon: DollarSign,
  },
  {
    label: 'Active Users',
    value: '2,847',
    change: '+8.1%',
    up: true,
    icon: Users,
  },
  {
    label: 'Orders',
    value: '1,204',
    change: '-2.3%',
    up: false,
    icon: ShoppingCart,
  },
]

const CardInfo = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, change, up, icon: Icon }) => (
        <div key={label} className="card flex items-center justify-between p-4">
          <div>
            <p className="text-xs text-muted">{label}</p>
            <p className="mt-1 text-xl font-semibold text-foreground">
              {value}
            </p>
            <p
              className={`mt-1 flex items-center gap-x-1 text-xs font-medium ${
                up ? 'text-emerald-500' : 'text-red-500'
              }`}
            >
              {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {change}
            </p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Icon size={18} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardInfo
