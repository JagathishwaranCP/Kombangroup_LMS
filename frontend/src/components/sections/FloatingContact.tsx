import { floatingContact } from "../../data/content";
import { WhatsAppIcon } from "../ui/BrandIcons";

const FloatingContact = () => (
  <a
    href={floatingContact.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={floatingContact.label}
    className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 inline-flex items-center gap-2 rounded-full bg-success p-3.5 font-semibold text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3"
  >
    <WhatsAppIcon />
    <span className="hidden sm:inline">{floatingContact.label}</span>
  </a>
);

export default FloatingContact;
