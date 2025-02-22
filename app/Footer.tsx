/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F8F6F2] text-gray-800 py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <Image height={100} width={100} src="/images/logo.png" alt="Lala Real Estate" className="mb-3" />
          <p className="text-sm text-gray-600">Building Your Dreams In Real Estate</p>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-500">Home</a></li>
            <li><a href="#" className="hover:text-gray-500">Our Properties</a></li>
            <li><a href="#" className="hover:text-gray-500">Our Advantages</a></li>
            <li><a href="#" className="hover:text-gray-500">Our Services</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Subscribe to our news</h4>
          <p className="text-sm text-gray-600 mb-3">
            Stay Informed and Never Miss a Beat. Subscribe to Our Exclusive News Updates!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:border-gray-500"
            />
            <button className="bg-black text-white px-4 py-2 text-sm font-semibold rounded-r-lg">
              Subscribe
            </button>
          </div>
        </div>

        {/* Contact & Map Section */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/images/logo.jpg"
              alt="Lala logo"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">Lala Founder</p>
              <p className="text-sm">Founder Name</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            We are here to change your future.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-lg">
            Contact Us
          </button>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4 text-gray-600">
            <FaEnvelope className="cursor-pointer hover:text-black" />
            <FaPaperPlane className="cursor-pointer hover:text-black" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-600">
        <p>Copyright © 2023 @ Lala Properties</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-gray-500">Terms Of Service</a>
          <a href="#" className="hover:text-gray-500">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
