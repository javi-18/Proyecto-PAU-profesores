import React, { useEffect } from 'react';

const Notification = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = {
        'success': 'bg-green-500',
        'warning': 'bg-yellow-500',
        'error': 'bg-red-500',
        'info': 'bg-usm-blue'
    }[type] || 'bg-gray-800';

    const icon = {
        'success': '✓',
        'warning': '⚠',
        'error': '✗',
        'info': 'ℹ'
    }[type] || 'ℹ';

    return (
        <div 
            className={`fixed top-20 right-5 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl font-semibold z-50 animate-fade-in max-w-md`}
            style={{
                animation: 'slideInRight 0.3s ease-out'
            }}
        >
            <div className="flex items-center space-x-3">
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                    <p className="text-sm leading-tight">{message}</p>
                </div>
                <button 
                    onClick={onClose}
                    className="text-white hover:text-gray-200 text-xl font-bold"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Notification;
