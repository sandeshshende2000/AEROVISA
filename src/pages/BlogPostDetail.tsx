import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="pt-32 pb-16 text-center text-white">
        <h1 className="text-3xl font-serif mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-luxury-gold hover:underline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-luxury-navy min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-luxury-gold hover:gap-3 transition-all font-bold text-sm"
          >
            <ArrowLeft size={18} /> Back to Blog
          </button>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <span className="bg-luxury-gold text-luxury-navy px-3 py-1 text-xs font-bold uppercase tracking-wider rounded inline-block mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm border-b border-white/10 pb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                  <User size={16} />
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-invert prose-luxury max-w-none">
            <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-400 hover:text-luxury-gold transition-colors text-sm font-bold">
                <Share2 size={18} /> Share Article
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-luxury-gold transition-colors text-sm font-bold">
                <Bookmark size={18} /> Save for Later
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Tags:</span>
              <span className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">Real Estate</span>
              <span className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">Investment</span>
              <span className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">Luxury</span>
            </div>
          </div>
        </motion.article>

        {/* Newsletter Signup */}
        <div className="mt-24 bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-serif text-white mb-4">Subscribe to AeroVisa Blog</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get exclusive off-market opportunities and market analysis delivered directly to your inbox.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-grow bg-luxury-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:border-luxury-gold outline-none transition-all"
              required
            />
            <button 
              type="submit"
              className="bg-luxury-gold text-luxury-navy px-8 py-3 rounded-lg font-bold hover:bg-white transition-all whitespace-nowrap"
            >
              Join the Network
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
