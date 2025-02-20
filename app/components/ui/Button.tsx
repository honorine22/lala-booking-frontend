interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary";
}

export const Button = ({ children, onClick, variant = "primary" }: ButtonProps) => {
    const styles =
        variant === "primary"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-black";

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg transition ${styles}`}
        >
            {children}
        </button>
    );
};
