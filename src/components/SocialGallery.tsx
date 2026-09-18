import React, { useState } from 'react';
import { Sparkles, Instagram, Video, ExternalLink } from 'lucide-react';
import { restaurantConfig } from '../data/restaurantConfig';
import boxingArenaImage from '../assets/images/boxing_arena_lights_1789760115937.jpg';

interface SocialPost {
  id: string;
  category: string;
  title: string;
  media: string;
  type: 'image' | 'video';
  platform: 'instagram' | 'tiktok';
}

export const SocialGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Burger Prep',
    'Spicy Challenges',
    'Atmosphere',
    'Events',
    'Training',
    'Desserts & Drinks'
  ];

  const posts: SocialPost[] = [
    {
      id: 'sp-1',
      category: 'Burger Prep',
      title: 'Double smash patty searing with crispy cheddar lace',
      media: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      type: 'image',
      platform: 'instagram'
    },
    {
      id: 'sp-2',
      category: 'Spicy Challenges',
      title: 'Roundhouse spicy chicken challenge at ringside',
      media: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
      type: 'image',
      platform: 'tiktok'
    },
    {
      id: 'sp-3',
      category: 'Atmosphere',
      title: 'Arena lights overhead and boxing ropes at dusk',
      media: boxingArenaImage,
      type: 'image',
      platform: 'instagram'
    },
    {
      id: 'sp-4',
      category: 'Events',
      title: 'Saturday fight night viewing on the giant LED wall',
      media: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80',
      type: 'image',
      platform: 'instagram'
    },
    {
      id: 'sp-5',
      category: 'Training',
      title: 'Speed bag drills & post-workout protein shakes',
      media: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      type: 'image',
      platform: 'tiktok'
    },
    {
      id: 'sp-6',
      category: 'Desserts & Drinks',
      title: 'TKO warm fudge brownie + blue electrolyte lemonade',
      media: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      type: 'image',
      platform: 'instagram'
    }
  ];

  const filteredPosts =
    activeCategory === 'ALL'
      ? posts
      : posts.filter(p => p.category === activeCategory);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>COMMUNITY REEL</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-6xl tracking-wide text-white">
              KNOCKOUT SOCIAL FIGHT
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Ringside footage, spicy food showdowns, burger craftsmanship, and martial training moments.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-bold text-neutral-300"
            >
              <Instagram className="w-4 h-4 text-red-500" />
              <span>Instagram: <span className="text-white font-medium">{restaurantConfig.socialMedia.instagram}</span></span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-bold text-neutral-300"
            >
              <Video className="w-4 h-4 text-blue-400" />
              <span>TikTok: <span className="text-white font-medium">{restaurantConfig.socialMedia.tiktok}</span></span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-red-600 border-red-400 text-white'
                  : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-neutral-900 border border-white/10 hover:border-red-500/50 shadow-xl"
            >
              <img
                src={post.media}
                alt={post.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = boxingArenaImage;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-black uppercase tracking-wider text-red-400">
                {post.category}
              </div>

              <div className="absolute bottom-4 inset-x-4 space-y-1">
                <span className="text-[10px] text-neutral-300 uppercase font-bold flex items-center gap-1">
                  {post.platform === 'instagram' ? <Instagram className="w-3 h-3 text-red-400" /> : <Video className="w-3 h-3 text-blue-400" />}
                  {post.platform === 'instagram' ? restaurantConfig.socialMedia.instagram : restaurantConfig.socialMedia.tiktok}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                  {post.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
