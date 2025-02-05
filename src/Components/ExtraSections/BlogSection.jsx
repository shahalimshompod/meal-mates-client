import Aos from "aos";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'aos/dist/aos.css';

const BlogSection = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetch('/featureFoodStories.json')
            .then((res) => res.json())
            .then((data) => setBlogPosts(data.featuredFoodStories));
    }, []);

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div data-aos="zoom-out">
                    <h2 className="text-xl lg:text-4xl text-gray-800 mb-4 text-center font-tanHeadline">Feature Food Stories</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Want to see the latest recipes we are working on? Read our daily blog
                        posts and stay up to date.
                    </p>
                </div>
                <div className="space-y-8 md:space-y-0 md:grid xl:grid-cols-2 md:gap-8">
                    {blogPosts.map((post) => (
                        <div data-aos="fade-up" key={post.id} className="group flex flex-col md:flex-row items-start bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Blog Image with Hover Effect */}
                            <div className="w-full md:w-1/3 h-full overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-2"
                                />
                            </div>
                            {/* Blog Content */}
                            <div className="p-4 flex-1">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-2">{post.shortDescription}</p>
                                <Link to='/under-construction' className="text-btnHover text-sm font-semibold mt-3 inline-block">Read More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
