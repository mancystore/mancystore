import React from 'react';
import { ArrowRight, Layers, Compass, Scissors, Target } from 'lucide-react';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { COLLECTION_ASSETS } from '../config/assets';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 sm:space-y-32 py-10 sm:py-16">
      {/* 1. Header & Hero Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#111111]/12 pb-14 space-y-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585]">
            MNC MANIFESTO // CONTEMPORARY STREETWEAR IDENTITY
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-[#111111] leading-[0.92]">
            Form follows weight. <br />
            Volume follows posture.
          </h1>
          <p className="text-sm sm:text-lg text-[#555555] max-w-2xl leading-relaxed pt-2">
            MNC is an independent contemporary fashion label grounded in architectural silhouettes, heavyweight custom textiles (300–500 GSM), and confident minimalism for everyday wear.
          </p>
        </div>
      </section>

      {/* 2. Showroom & Visual Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] bg-[#1E1E1E] overflow-hidden border border-[#111111]/12 group">
              <ImageWithFallback
                src={COLLECTION_ASSETS['mnc-archive'].path}
                alt="MNC Architecture and Showroom Environment"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
            </div>
            <div className="pt-2 flex justify-between text-[10px] font-mono text-[#858585] uppercase">
              <span>SHOWROOM SPACE // CONCRETE MINIMALISM</span>
              <span>EST. 2026</span>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585]">
              ORIGINS & CREATIVE DIRECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#111111]">
              Born between urban concrete and quiet luxury.
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              We draw inspiration from modern brutalist buildings, high-density industrial canvas, and the understated confidence of international streetwear culture. MNC products reject loud, commercial billboards across the chest in favor of precision fit, dropped shoulder lines, and custom-developed knitwear.
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Every piece is engineered to be an accessible luxury staple — substantial enough to hold its form across years of wear, yet fluid enough for daily movement.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 4 Brand Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585]">
            BRAND INVARIANTS
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight text-[#111111]">
            The MNC Design Constitution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FFFFFF] p-6 border border-[#111111]/12 space-y-3">
            <Layers className="w-5 h-5 text-[#111111]" />
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-[#111111]">
              Textile Density
            </h3>
            <p className="text-xs text-[#858585] leading-relaxed font-sans">
              Our prototype sample development targets heavyweight 300–340 GSM cottons for t-shirts and a dense ~500 GSM loopback fleece for hoodies.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 border border-[#111111]/12 space-y-3">
            <Compass className="w-5 h-5 text-[#111111]" />
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-[#111111]">
              Boxy Geometry
            </h3>
            <p className="text-xs text-[#858585] leading-relaxed font-sans">
              Calibrated drop shoulders combined with balanced body lengths. Garments stand cleanly off the body with architectural streetwear volume.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 border border-[#111111]/12 space-y-3">
            <Scissors className="w-5 h-5 text-[#111111]" />
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-[#111111]">
              Collar Integrity
            </h3>
            <p className="text-xs text-[#858585] leading-relaxed font-sans">
              Targeted ~3.2cm 1x1 rib knit collar construction engineered to maintain shape and resist sagging across domestic washing cycles.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 border border-[#111111]/12 space-y-3">
            <Target className="w-5 h-5 text-[#111111]" />
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-[#111111]">
              Accessible Luxury
            </h3>
            <p className="text-xs text-[#858585] leading-relaxed font-sans">
              Demonstrating direct contemporary streetwear design without multi-tiered wholesale markups, quoted in transparent Malaysian Ringgit.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Editorial Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-[#F5F4F0] p-8 sm:p-16 text-center space-y-6 border border-[#222222]">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9A9A91]">
            EXPERIENCE THE SILHOUETTE
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-[#F5F4F0]">
            Ready to upgrade your daily rotation?
          </h2>
          <p className="text-xs sm:text-sm text-[#858585] max-w-md mx-auto">
            Discover the inaugural Season 001 and timeless MNC Essentials roster.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('shop')}
              className="font-mono tracking-widest text-xs"
            >
              <span>Explore All Garments</span>
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
