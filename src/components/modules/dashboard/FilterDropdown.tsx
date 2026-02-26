/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface FilterProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: any[];
  placeholder?: string;
}

export const FilterDropdown = ({ label, value, onValueChange, options, placeholder }: FilterProps) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1 opacity-70">
      {label}
    </label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-brand-dark border-white/10 text-white h-11 rounded-xl focus:ring-brand-primary/20 w-full transition-all">
        <SelectValue placeholder={placeholder || `Select ${label}`} />
      </SelectTrigger>
      <SelectContent className="bg-brand-deep border-white/10 text-white rounded-xl shadow-2xl">
        {/* সর্টিং না হলে 'All' অপশন থাকবে */}
        {!label.toLowerCase().includes("sort") && (
          <SelectItem value="all" className="focus:bg-brand-primary focus:text-brand-dark">All {label}</SelectItem>
        )}
        
        {options.map((opt: any) => (
          <SelectItem 
            key={typeof opt === 'string' ? opt : opt.v} 
            value={typeof opt === 'string' ? opt : opt.v}
            className="focus:bg-brand-primary focus:text-brand-dark cursor-pointer font-medium"
          >
            {typeof opt === 'string' ? opt : opt.l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);