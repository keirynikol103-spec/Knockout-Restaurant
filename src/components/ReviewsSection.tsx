import React, { useState } from 'react';
import { CustomerReview } from '../types';
import { initialReviews } from '../data/reviews';
import { Star, MessageSquare, ShieldCheck, Send } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(initialReviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = (name || '').trim();
    const cleanText = (reviewText || '').trim();
    const cleanPhoto = (photoUrl || '').trim();
    if (!cleanName || !cleanText) return;

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: cleanName,
      rating,
      review: cleanText,
      date: 'Just now',
      photo: cleanPhoto || undefined,
      isVerified: false
    };

    setReviewsList(prev => [newReview, ...prev]);
    setName('');
    setReviewText('');
    setPhotoUrl('');
    setSubmittedNotice(true);
  };

  const averageRating =
    reviewsList.length > 0
      ? (reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length).toFixed(1)
      : null;

  return (
    <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-red-500" />
            <span>FANS & COMMUNITY</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white">
            THE CROWD HAS SPOKEN
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-1">
            Real reactions from fight-night fans who stepped into the ring.
          </p>

          {/* Rating summary */}
          {averageRating ? (
            <div className="mt-4 inline-flex items-center gap-2 bg-neutral-900 px-4 py-2 rounded-2xl border border-white/10">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bebas text-2xl text-white font-bold">{averageRating} / 5.0</span>
              <span className="text-xs text-neutral-400">({reviewsList.length} reviews)</span>
            </div>
          ) : null}
        </div>

        {/* Existing Reviews Grid or Empty Placeholder */}
        {reviewsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-[#0f121a] border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-amber-400' : 'text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-500">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">
                      {rev.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-sm text-white">{rev.name}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-semibold uppercase">
                    Fan Review
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-neutral-900/40 rounded-3xl border border-white/10 max-w-xl mx-auto space-y-2">
            <span className="text-4xl block">📣</span>
            <p className="font-bebas text-2xl tracking-wider text-neutral-400">
              [CUSTOMER REVIEWS WILL APPEAR HERE]
            </p>
            <p className="text-xs text-neutral-500">
              Be the first to step into the ring and voice your verdict on our burgers and fight night experience.
            </p>
          </div>
        )}

        {/* Submit Review Card */}
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0f121c] border border-white/10 shadow-2xl space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <ShieldCheck className="w-5 h-5 text-red-500" />
            <h3 className="font-bebas text-2xl tracking-wide text-white">
              LEAVE YOUR FIGHT CARD VERDICT
            </h3>
          </div>

          {submittedNotice && (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-300 text-xs">
              🥊 Thank you for your feedback! Please note that reviews may require moderation before permanent publication.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label htmlFor="review-name" className="font-bold text-neutral-300 uppercase block mb-1">
                Your Name *
              </label>
              <input
                id="review-name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Alex Henderson"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-neutral-300 uppercase block mb-1">
                Combat Rating (1 to 5 Stars) *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl focus:outline-none transition-transform hover:scale-110"
                    aria-label={`${star} Stars`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 font-bebas text-lg text-neutral-300">{rating} of 5 Stars</span>
              </div>
            </div>

            <div>
              <label htmlFor="review-text" className="font-bold text-neutral-300 uppercase block mb-1">
                Your Experience / Review *
              </label>
              <textarea
                id="review-text"
                required
                rows={3}
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="How were the burgers, flavor, and arena atmosphere?"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="review-photo" className="font-bold text-neutral-300 uppercase block mb-1">
                Photo URL (Optional)
              </label>
              <input
                id="review-photo"
                type="url"
                value={photoUrl}
                onChange={e => setPhotoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bebas text-xl tracking-wider border border-red-400 flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT REVIEW</span>
              </button>
            </div>

            <p className="text-[11px] text-neutral-500 text-center italic">
              Reviews may require moderation before publication.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
