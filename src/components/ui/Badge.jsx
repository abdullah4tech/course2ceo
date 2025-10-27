import { cva } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        'not-purchased': 'bg-gray-100 text-gray-800',
        'pending': 'bg-warning-100 text-warning-800',
        'active': 'bg-success-100 text-success-800',
        'expired': 'bg-danger-100 text-danger-800',
        'published': 'bg-primary-100 text-primary-800',
        'draft': 'bg-gray-100 text-gray-600',
      },
    },
    defaultVariants: {
      variant: 'not-purchased',
    },
  }
)

const Badge = ({ variant, children, className = '', ...props }) => {
  return (
    <span 
      className={`${badgeVariants({ variant })} ${className}`} 
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge