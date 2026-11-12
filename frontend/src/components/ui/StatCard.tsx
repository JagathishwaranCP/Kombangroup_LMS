import type { Stat } from "../../data/content";
import CountUp from "./CountUp";

const StatCard = ({ icon: Icon, value, suffix, label }: Stat) => (
  <div className="flex h-full items-center gap-4 rounded-2xl bg-white p-6 text-left shadow-card md:gap-3 md:p-5 lg:gap-4 lg:p-6">
    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-electric-grad text-white">
      <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="text-[40px] font-bold leading-none text-electric">
        <CountUp value={value} suffix={suffix} />
      </p>
      <p className="mt-2 text-sm leading-snug text-body">{label}</p>
    </div>
  </div>
);

export default StatCard;
