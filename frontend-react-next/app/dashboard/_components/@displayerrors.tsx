// app/components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6 max-w-md mx-auto">
            
            <span className="block sm:inline">{message}</span>
        </div>
    );

};

export default ErrorMessage;

export const getUserFriendlyError = (error: unknown): string => {

    if (error instanceof Error) {
        const msg = error.message.toLowerCase();

        if (msg.includes("network")) return "Unable to connect. Please check your internet.";
        if (msg.includes("unauthorized")) return "Please log in to continue.";
        if (msg.includes("forbidden")) return "You don’t have permission to access this.";
        if (msg.includes("not found")) return "Requested resource was not found.";
        if (msg.includes("validation")) return "Some fields are missing or invalid.";
        return "Something went wrong. Please try again.";
    }

    return "Something went wrong. Please try again.";
};