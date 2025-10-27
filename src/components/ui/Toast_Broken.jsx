import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

const Toast = ({ toast, onRemove }) => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
  }

  const colors = {
    success: 'success',
    error: 'danger',
    warning: 'warning',
    info: 'primary',
  }

  const Icon = icons[toast.type]

  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="max-w-sm w-full"
        >
          <Card className="shadow-lg">
            <CardBody className="p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <Icon className={`h-6 w-6 text-${colors[toast.type]}`} />
                </div>
                <div className="flex-1">
                  {toast.title && (
                    <p className="text-sm font-medium text-foreground">
                      {toast.title}
                    </p>
                  )}
                  <p className={`text-sm text-foreground-600 ${toast.title ? 'mt-1' : ''}`}>
                    {toast.message}
                  </p>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => onRemove(toast.id)}
                  className="text-foreground-400 hover:text-foreground-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast