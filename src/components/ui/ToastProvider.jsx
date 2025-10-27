import { useState, useCallback } from 'react'
import { ToastContext } from './toastContext'
import Toast from './Toast'

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    )

    // Remove from array after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 300)
  }, [])

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = {
      id,
      visible: true,
      type: 'info',
      ...toast,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 5000)

    return id
  }, [removeToast])

  const toast = {
    success: (message, options = {}) =>
      addToast({ ...options, message, type: 'success' }),
    error: (message, options = {}) =>
      addToast({ ...options, message, type: 'error' }),
    warning: (message, options = {}) =>
      addToast({ ...options, message, type: 'warning' }),
    info: (message, options = {}) =>
      addToast({ ...options, message, type: 'info' }),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast container */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  )
}