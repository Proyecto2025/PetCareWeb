import { useState } from "react";

function Filter({ title, options }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <article className="mb-6 flex  justify-end items-center">
            <section className="relative inline-block">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="font-bold text-lg contenedor__textfont flex items-center contenedor__texto-primary cursor-pointer"
                >
                    {title}
                    <span class="material-symbols-outlined ml-1">
                        filter_list
                    </span>
                </button>

                {isOpen && (
                    <section className="w-full absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                        {options.map((opt) => (
                            <section
                                key={opt.label}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
            </section>
        </article>
    );
}

export default Filter;
