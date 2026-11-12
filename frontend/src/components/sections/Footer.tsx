import type { ReactNode } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { brand, footer, nav } from "../../data/content";
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
  <footer className="bg-black pt-10 text-body-dark md:pt-12">
    <Container>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo showName tone="dark" />
          <p className="mt-3 max-w-[340px] text-sm font-light leading-relaxed tracking-wide">
            {brand.description}
          </p>
        </div>

        <nav aria-label={footer.navigationLabel}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {footer.navigationLabel}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {footer.socialLabel}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
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
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pb-20 pt-5 text-[12px] tracking-wide sm:text-[13px] md:flex-row md:items-center md:justify-between md:pb-16">
        <p className="leading-relaxed">
          © {new Date().getFullYear()} {brand.name}. {footer.rights}
        </p>
        <nav aria-label={footer.legalLabel}>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-5">
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
