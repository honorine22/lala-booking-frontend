
"use client"
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    { question: "What types of properties do we offer in Rwanda?", answer: "We offer a variety of properties including apartments, villas, and commercial spaces." },
    { question: "What are the payment options available for purchasing a property?", answer: "Payment plans include mortgages, installment plans, and full upfront payment options." },
    { question: "Can foreign nationals buy property in Rwanda?", answer: "Yes, foreign nationals can purchase property in designated freehold areas." },
    { question: "What is the process for obtaining a residency visa through property investment?", answer: "Investing in properties above a certain value can qualify you for a residency visa." },
    { question: "Are there any additional costs associated with property ownership in Rwanda?", answer: "Yes, these include maintenance fees, service charges, and registration costs." },
    { question: "Do we offer property management services for rental properties?", answer: "Yes, we provide comprehensive property management services." },
    { question: "Can we assist with property financing for non-resident buyers?", answer: "Yes, we work with financial institutions to offer mortgage options for non-residents." },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start w-full bg-[#F7F6F1] p-10 md:p-20 text-black gap-2">
            {/* Left Side */}
            <div className="md:w-1/2">
                <h2 className="text-lg font-semibold uppercase mb-2">Explore Our Advantages</h2>
                <h1 className="text-4xl md:text-5xl font-black">Frequently Asked Questions</h1>
                <p className="text-lg mt-4">At Monte, we offer more than just real estate services; we provide an unparalleled experience tailored to meet your needs and exceed your expectations.</p>
            </div>

            {/* Right Side - FAQs */}
            <div className="md:w-1/2 bg-white rounded-xl p-6 shadow-lg mt-10 md:mt-0">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b last:border-b-0">
                        <button
                            className="w-full flex justify-between items-center py-4 text-lg font-medium text-left"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            {faq.question}
                            {openIndex === index ? <FaMinus className="text-gray-500" /> : <FaPlus className="text-gray-500" />}
                        </button>
                        {openIndex === index && <p className="text-gray-700 pb-4">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
