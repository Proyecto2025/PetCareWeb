import { useState } from "react";

function Filter({ title, options }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <article className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center font-bold text-lg md:text-xl contenedor__textfont primary-color cursor-pointer"
            >
                {title}
                <span className="material-symbols-outlined ml-1 md:text-xl">
                    filter_list
                </span>
            </button>

            {isOpen && (
                <section className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-max">
                    {options.map((opt, index) => (
                        <section
                            key={opt.label}
                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                                index < options.length - 1 ? "border-b border-gray-200" : ""
                            }`}
                            onClick={() => {
                                opt.onClick();
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </section>
                    ))}
                </section>
            )}
        </article>
    );
}

export default Filter;