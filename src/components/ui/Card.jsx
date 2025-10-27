import { forwardRef } from 'react'

const Card = forwardRef(({ 
  className = '', 
  children, 
  hover = false,
  onClick,
  ...props 
}, ref) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-200'
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : ''
  const clickableClasses = onClick ? 'cursor-pointer' : ''

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ className = '', children, ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
)

const CardFooter = ({ className = '', children, ...props }) => (
  <div className={`px-6 py-4 border-t border-gray-200 ${className}`} {...props}>
    {children}
  </div>
)

Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter

export default Card