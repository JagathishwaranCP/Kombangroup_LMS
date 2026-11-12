import { floatingContact } from "../../data/content";
import { WhatsAppIcon } from "../ui/BrandIcons";

const FloatingContact = () => (
  <a
    href={floatingContact.href}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-success px-5 py-3 font-semibold text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
  >
    <WhatsAppIcon />
    {floatingContact.label}
  </a>
);

export default FloatingContact;
