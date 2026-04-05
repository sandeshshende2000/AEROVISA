import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Blog: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-luxury-navy min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">AeroVisa Insights</h1>
          <p className="text-luxury-gold text-lg max-w-2xl mx-auto">
            Expert analysis, market trends, and exclusive guides for the global luxury real estate investor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-luxury-gold/50 transition-all group"
            >
              <Link to={`/blog/${post.slug}`} className="block relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-luxury-gold text-luxury-navy px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                    {post.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-serif text-white mb-3 group-hover:text-luxury-gold transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-luxury-gold font-bold text-sm hover:gap-3 transition-all"
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
