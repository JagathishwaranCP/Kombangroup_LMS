import type { Stat } from "../../data/content";
import CountUp from "./CountUp";

const StatCard = ({ icon: Icon, value, suffix, label }: Stat) => (
  <div className="flex h-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-card md:p-5">
    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-electric-grad text-white">
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="text-[32px] font-bold leading-none text-electric md:text-[36px]">
        <CountUp value={value} suffix={suffix} />
      </p>
      <p className="mt-1.5 text-sm leading-snug text-body">{label}</p>
    </div>
  </div>
);

export default StatCard;
