const categories = ["Apartments", "Villas", "Cabins", "Condos"];
export default function Categories() {
    return (
        <div className="w-full md:w-1/4 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Categories</h2>
            <ul className="mt-4">
                {categories.map((category, idx) => (
                    <li key={idx} className="text-lg text-gray-800 hover:text-black cursor-pointer py-2">
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}