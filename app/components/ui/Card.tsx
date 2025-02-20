interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div className={`bg-white shadow-lg rounded-xl p-6 ${className}`}>
            {children}
        </div>
    );
};
