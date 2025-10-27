import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

const Toast = ({ toast, dismissToast }) => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon
  }

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-400',
      text: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-400',
      text: 'text-red-800'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-400',
      text: 'text-yellow-800'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-400',
      text: 'text-blue-800'
    }
  }

  const Icon = icons[toast.type]
  const style = styles[toast.type]

  if (!toast.visible) return null

  return (
    <div className="max-w-sm w-full">
      <div className={`${style.bg} ${style.border} border shadow-lg rounded-lg p-4`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${style.icon}`} />
          </div>
          
          <div className="ml-3 w-0 flex-1">
            {toast.title && (
              <p className={`text-sm font-medium ${style.text}`}>
                {toast.title}
              </p>
            )}
            <p className={`text-sm ${style.text} ${toast.title ? 'mt-1' : ''}`}>
              {toast.message}
            </p>
          </div>
          
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={() => dismissToast(toast.id)}
              className={`${style.text} hover:opacity-75 p-1 rounded`}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toast