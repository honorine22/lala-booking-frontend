import { motion } from 'framer-motion';

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const TableSkeletonLoader = ({ rows = 5 }) => {
    return (
        <table className="min-w-full rounded-xl">
            <thead>
                <tr className="bg-zinc-100">
                    {["Property", "Check-In", "Check-Out", "Status", "Actions"].map((header, index) => (
                        <th key={index} scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
                {Array.from({ length: rows }).map((_, index) => (
                    <motion.tr
                        key={index}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white transition-all duration-500 hover:bg-gray-50"
                    >
                        {[...Array(5)].map((_, tdIndex) => (
                            <td key={tdIndex} className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
                            </td>
                        ))}
                    </motion.tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableSkeletonLoader;
