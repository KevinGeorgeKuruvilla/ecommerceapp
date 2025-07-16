// src/pages/BlogPage.jsx
import React from "react";

const blogs = [
  {
    title: "Why Choosing the Right Electronics Matters",
    author: "Admin",
    date: "June 2, 2025",
    content: `In today's fast-paced digital world, electronics are no longer just luxury items—they're necessities. 
    Whether it’s a smartphone, a laptop, or home automation gear, choosing the right electronics can greatly influence 
    your productivity, comfort, and even your safety.

    When selecting gadgets, always consider three key things: performance, reliability, and after-sales support. 
    At our store, we curate products from top brands that we trust, ensuring that you get nothing but the best.

    Explore our latest arrivals to experience innovation that truly meets your everyday needs.`,
  },
  {
    title: "5 Tips to Make Your Electronics Last Longer",
    author: "Admin",
    date: "June 1, 2025",
    content: `Electronics can be expensive, and replacing them frequently isn't ideal. 
    Fortunately, you can extend the life of your devices with a few simple habits:

    1. Avoid Overcharging – Leaving devices plugged in overnight can reduce battery health.
    2. Keep Devices Clean – Dust can cause overheating and slow performance.
    3. Use Surge Protectors – Protect your gadgets from voltage spikes.
    4. Update Software Regularly – Security patches and performance updates matter.
    5. Handle with Care – Most damage happens due to drops or liquid spills.

    Taking care of your electronics is a smart investment. Treat them well, and they'll serve you longer!`,
  },
];

export function BlogPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        Our Blog
      </h1>
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">
            {blog.title}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            By {blog.author} | {blog.date}
          </p>
          <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
        </div>
      ))}
    </div>
  );
}
