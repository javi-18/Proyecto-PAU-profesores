import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColor = {
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    }[type] || 'bg-gray-800';

    const icon = {
        success: '✓',
        warning: '⚠',
        error: '✗',
        info: 'ℹ'
    }[type] || '•';

    return (
        <div 
            className={`fixed bottom-5 right-5 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-slide-up flex items-center space-x-3 min-w-[300px]`}
            style={{
                animation: 'slideUp 0.3s ease-out'
            }}
        >
            <span className="text-2xl font-bold">{icon}</span>
            <span className="font-semibold flex-1">{message}</span>
            <button 
                onClick={onClose}
                className="text-white hover:text-gray-200 font-bold text-xl"
            >
                ×
            </button>
        </div>
    );
};

export default Toast;
