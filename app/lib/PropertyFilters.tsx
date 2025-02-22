"use client";
import React from "react";

interface FilterProps {
    filters: {
        priceRange: string;
        propertyType: string;
        bedrooms: string;
        bathrooms: string;
        location: string;
        sort: string;
    };
    onFilterChange: (name: string, value: string) => void;
}

const PropertyFilters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
    return (
        <div className="flex flex-wrap gap-4 items-center">
            {/* Price Range */}
            <select
                name="priceRange"
                className="border p-3 rounded-md text-sm bg-gray-100 focus:outline-none"
                value={filters.priceRange}
                onChange={(e) => onFilterChange("priceRange", e.target.value)}
            >
                <option value="">Price Range</option>
                <option value="0-500">$0 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
            </select>

            {/* Property Type */}
            <select
                name="propertyType"
                className="border p-3 rounded-md text-sm bg-gray-100 focus:outline-none"
                value={filters.propertyType}
                onChange={(e) => onFilterChange("propertyType", e.target.value)}
            >
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
            </select>

            {/* Bedrooms */}
            <select
                name="bedrooms"
                className="border p-3 rounded-md text-sm bg-gray-100 focus:outline-none"
                value={filters.bedrooms}
                onChange={(e) => onFilterChange("bedrooms", e.target.value)}
            >
                <option value="">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
            </select>

            {/* Bathrooms */}
            <select
                name="bathrooms"
                className="border p-3 rounded-md text-sm bg-gray-100 focus:outline-none"
                value={filters.bathrooms}
                onChange={(e) => onFilterChange("bathrooms", e.target.value)}
            >
                <option value="">Bathrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
            </select>

            {/* Location */}
            <input
                type="text"
                name="location"
                placeholder="Search by location..."
                className="border px-2 py-3 rounded-md text-sm focus:outline-none"
                value={filters.location}
                onChange={(e) => onFilterChange("location", e.target.value)}
            />

            {/* Sorting Dropdown */}
            <select
                name="sort"
                className="border p-3 rounded-md text-sm bg-gray-100 focus:outline-none"
                value={filters.sort}
                onChange={(e) => onFilterChange("sort", e.target.value)}
            >
                <option value="Newest">Newest</option>
                <option value="Most Popular">Most Popular</option>
                <option value="Best Rating">Best Rating</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
            </select>
        </div>
    );
};

export default PropertyFilters;
