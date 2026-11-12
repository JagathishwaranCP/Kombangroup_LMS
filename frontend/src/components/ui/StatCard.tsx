import type { Stat } from "../../data/content";
import CountUp from "./CountUp";

const StatCard = ({ icon: Icon, value, suffix, label }: Stat) => (
  <div className="flex h-full items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-card sm:p-4 md:p-5">
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-electric-grad text-white sm:size-12">
      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="text-[28px] font-bold leading-none text-electric sm:text-[32px] md:text-[36px]">
        <CountUp value={value} suffix={suffix} />
      </p>
      <p className="mt-1 text-xs leading-snug text-body sm:mt-1.5 sm:text-sm">{label}</p>
    </div>
  </div>
);

export default StatCard;
