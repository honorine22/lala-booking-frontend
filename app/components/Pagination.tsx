import { motion } from "framer-motion";

type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <motion.div
            className="flex items-center justify-center space-x-2 my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-600"}`}
            >
                Prev
            </button>

            {pages.map((pageNumber) => (
                <motion.button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    whileHover={{ scale: 1.1 }}
                    className={`px-4 py-2 rounded-lg ${pageNumber === page ? "bg-[#9CEE69] text-black font-bold" : "bg-gray-200 hover:bg-gray-400"
                        }`}
                >
                    {pageNumber}
                </motion.button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-600"}`}
            >
                Next
            </button>
        </motion.div>
    );
}
