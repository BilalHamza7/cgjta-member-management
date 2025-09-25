import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ label, items = [], onchange }) => {
    const [open, setOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(label);
    const dropdownRef = useRef(null);

    const handleSelect = (item) => {
        setSelectedLabel(item.label);
        if (item.onClick) item.onClick();
        setOpen(false);
        onchange((item.label === "All Levels" || item.label === "All Statuses") ? "0" : item.label);
    }

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="px-4 py-2 w-48 bg-white rounded shadow-gray-400 shadow flex items-center justify-between hover:bg-gray-100 transition"
            >
                {selectedLabel}
                <span className="text-gray-600">{open ? "▲" : "▼"}</span>
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute mt-2 w-48 bg-white rounded shadow-gray-400 shadow z-10">
                    <ul className="flex flex-col">
                        {items.map((item, idx) => (
                            <li key={idx}>
                                <button
                                    onClick={() => handleSelect(item)}
                                    className="w-full text-left px-4 py-2 hover:bg-[#DDE2C6] transition duration-300 rounded"
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
