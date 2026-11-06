import React, { useState } from 'react';
import { X, Ruler, HelpCircle, AlertCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  category = 'Tees',
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    ['Tees', 'Hoodies', 'Shirts', 'Long Sleeves'].includes(category) ? category : 'Tees'
  );

  if (!isOpen) return null;

  // Prototype Flat-Lay Garment Measurements in Centimetres (CM)
  const prototypeMeasurements: Record<
    string,
    Array<{ size: string; chest: number; length: number; shoulder: number; sleeve: number }>
  > = {
    Tees: [
      { size: 'XS', chest: 106, length: 70, shoulder: 52, sleeve: 22 },
      { size: 'S', chest: 112, length: 72, shoulder: 54, sleeve: 23 },
      { size: 'M', chest: 118, length: 74, shoulder: 56, sleeve: 24 },
      { size: 'L', chest: 124, length: 76, shoulder: 58, sleeve: 25 },
      { size: 'XL', chest: 130, length: 78, shoulder: 60, sleeve: 26 },
      { size: 'XXL', chest: 136, length: 80, shoulder: 62, sleeve: 27 },
    ],
    Hoodies: [
      { size: 'S', chest: 120, length: 68, shoulder: 60, sleeve: 62 },
      { size: 'M', chest: 126, length: 70, shoulder: 62, sleeve: 63 },
      { size: 'L', chest: 132, length: 72, shoulder: 64, sleeve: 64 },
      { size: 'XL', chest: 138, length: 74, shoulder: 66, sleeve: 65 },
      { size: 'XXL', chest: 144, length: 76, shoulder: 68, sleeve: 66 },
    ],
    Shirts: [
      { size: 'S', chest: 114, length: 73, shoulder: 53, sleeve: 60 },
      { size: 'M', chest: 120, length: 75, shoulder: 55, sleeve: 61 },
      { size: 'L', chest: 126, length: 77, shoulder: 57, sleeve: 62 },
      { size: 'XL', chest: 132, length: 79, shoulder: 59, sleeve: 63 },
    ],
    'Long Sleeves': [
      { size: 'S', chest: 114, length: 72, shoulder: 55, sleeve: 62 },
      { size: 'M', chest: 120, length: 74, shoulder: 57, sleeve: 63 },
      { size: 'L', chest: 126, length: 76, shoulder: 59, sleeve: 64 },
      { size: 'XL', chest: 132, length: 78, shoulder: 61, sleeve: 65 },
    ],
  };

  const rows = prototypeMeasurements[activeTab] || prototypeMeasurements['Tees'];

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F5F4F0] w-full max-w-2xl border border-[#111111]/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#111111]/12 bg-[#EAE8E2]">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-4 h-4 text-[#111111]" />
            <h3 className="text-base font-display font-black uppercase tracking-wider text-[#111111]">
              Garment Dimensions & Size Guide (Centimetres)
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="text-[#858585] hover:text-[#111111] p-1 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype Measurements Disclosure Notice */}
        <div className="bg-[#111111] text-[#F5F4F0] px-6 py-3 flex items-start gap-2.5 text-xs font-mono">
          <AlertCircle className="w-4 h-4 text-[#9A9A91] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#FFFFFF]">PROTOTYPE ESTIMATES:</strong> All figures represent flat-lay garment measurements in centimetres (CM) with a ±1.5cm manufacturing sample tolerance. These are not body measurements. Final production grading is subject to manufacturer tech pack verification.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="p-6 border-b border-[#111111]/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {['Tees', 'Hoodies', 'Shirts', 'Long Sleeves'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTab === cat
                    ? 'bg-[#111111] text-[#F5F4F0] border-[#111111] font-bold'
                    : 'bg-[#FFFFFF] text-[#858585] border-[#111111]/12 hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-[#858585] uppercase tracking-wider shrink-0">
            Unit: Centimetres (CM)
          </span>
        </div>

        {/* Content Table */}
        <div className="p-6 space-y-6 max-h-[55vh] overflow-y-auto">
          <div className="overflow-x-auto border border-[#111111]/12 bg-[#FFFFFF]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#EAE8E2] text-[#858585] uppercase tracking-wider text-[11px] font-mono font-semibold border-b border-[#111111]/12">
                <tr>
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Chest Width (CM)</th>
                  <th className="py-3 px-3">Garment Length (CM)</th>
                  <th className="py-3 px-3">Shoulder Drop (CM)</th>
                  <th className="py-3 px-3">Sleeve Length (CM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111111]/10 font-mono tabular-nums">
                {rows.map((row) => (
                  <tr key={row.size} className="hover:bg-[#EAE8E2]/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-[#111111]">{row.size}</td>
                    <td className="py-2.5 px-3">{row.chest} cm</td>
                    <td className="py-2.5 px-3">{row.length} cm</td>
                    <td className="py-2.5 px-3">{row.shoulder} cm</td>
                    <td className="py-2.5 px-3">{row.sleeve} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Explanation of Measurement Points */}
          <div className="space-y-4 text-xs text-[#555555] leading-relaxed border-t border-[#111111]/10 pt-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              How MNC Measures Garments (Flat-Lay Methodology)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono text-[#858585]">
              <div className="border border-[#111111]/10 p-3 bg-[#FFFFFF] space-y-1">
                <strong className="text-[#111111] block">1. CHEST WIDTH</strong>
                <span>Measured flat across the front from armpit seam to armpit seam (multiply by 2 for total circumference).</span>
              </div>
              <div className="border border-[#111111]/10 p-3 bg-[#FFFFFF] space-y-1">
                <strong className="text-[#111111] block">2. GARMENT LENGTH</strong>
                <span>Measured vertically from the highest shoulder point adjacent to the collar down to the bottom hem.</span>
              </div>
              <div className="border border-[#111111]/10 p-3 bg-[#FFFFFF] space-y-1">
                <strong className="text-[#111111] block">3. SHOULDER DROP</strong>
                <span>Measured straight across the back from shoulder point to shoulder point to assess the dropped cut.</span>
              </div>
              <div className="border border-[#111111]/10 p-3 bg-[#FFFFFF] space-y-1">
                <strong className="text-[#111111] block">4. SLEEVE LENGTH</strong>
                <span>Measured from the dropped shoulder seam down to the outer edge of the cuff.</span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-[#858585] pt-1">
              * Fit guidance: MNC garments are cut with deliberate oversized volume. Compare the flat-lay chest measurements against a favorite t-shirt in your existing wardrobe.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EAE8E2] border-t border-[#111111]/12 flex justify-between items-center text-xs font-mono text-[#858585]">
          <span>MNC DEMO SPECIFICATION · PHASE 1.2</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#111111] text-[#F5F4F0] text-xs font-mono uppercase tracking-widest cursor-pointer hover:bg-[#2A2A2A] transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
