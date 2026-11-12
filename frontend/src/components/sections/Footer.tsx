import type { ReactNode } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { brand, footer } from "../../data/content";
import type { SocialNetwork } from "../../data/content";
import { XIcon } from "../ui/BrandIcons";
import Container from "../ui/Container";
import Logo from "../ui/Logo";

const socialIcons: Record<SocialNetwork, ReactNode> = {
  facebook: <Facebook size={16} aria-hidden="true" />,
  instagram: <Instagram size={16} aria-hidden="true" />,
  x: <XIcon size={14} />,
  linkedin: <Linkedin size={16} aria-hidden="true" />,
  youtube: <Youtube size={16} aria-hidden="true" />,
};

const Footer = () => (
  <footer className="bg-black pt-16 text-body-dark">
    <Container>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-[340px] text-sm font-light leading-relaxed tracking-wide">
            {brand.description}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2.5">
          {footer.socials.map((social) => (
            <li key={social.network}>
              <a
                href={social.href}
                aria-label={social.label}
                className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-indigo"
              >
                {socialIcons[social.network]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Extra bottom padding keeps the legal links clear of the floating contact button. */}
      <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pb-20 pt-6 text-[13px] tracking-wide md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {brand.name}. {footer.rights}
        </p>
        <nav aria-label={footer.legalLabel}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors duration-200 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  </footer>
);

export default Footer;
