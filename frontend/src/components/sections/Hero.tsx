import { hero } from "../../data/content";
import { cn } from "../../utils/cn";
import CrossShape from "../decor/CrossShape";
import DashedPath from "../decor/DashedPath";
import DotGrid from "../decor/DotGrid";
import HandDrawnEllipse from "../decor/HandDrawnEllipse";
import PaperPlane from "../decor/PaperPlane";
import { BlobGradient, Dot, HalfCircle } from "../decor/Shapes";
import Button from "../ui/Button";
import Container from "../ui/Container";
import PersonFigure from "../ui/PersonFigure";
import SectionTag from "../ui/SectionTag";

interface StickerProps {
  src: string;
  /** Position and size of the floating wrapper. */
  className: string;
  /** Tilt for the image; kept off the wrapper so it survives the float animation. */
  tilt: string;
  delay: string;
}

const Sticker = ({ src, className, tilt, delay }: StickerProps) => (
  <span
    aria-hidden="true"
    className={cn("pointer-events-none absolute block animate-float", className)}
    style={{ animationDelay: delay }}
  >
    <img src={src} alt="" className={cn("h-auto w-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]", tilt)} />
  </span>
);

const Hero = () => {
  return (
    <section id="home" aria-labelledby="hero-title" className="overflow-hidden bg-primary">
      <Container className="relative">
        <CrossShape className="-left-2 top-1 hidden size-11 text-electric/30 lg:block" />

        <div className="relative flex min-h-[620px] flex-col pt-20">
          <div className="grid flex-1 grid-cols-1 items-center gap-10 pb-12 pt-6 md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="text-center md:text-left">
              <SectionTag tone="dark">{hero.tag}</SectionTag>
              <h1
                id="hero-title"
                className="mt-5 text-[32px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-[36px] md:text-[34px] lg:text-[40px] xl:text-[48px]"
              >
                <span className="block">{hero.title.line1}</span>
                <span className="block">
                  {hero.title.line2}{" "}
                  <span className="relative inline-block">
                    {hero.title.circled}
                    <HandDrawnEllipse />
                  </span>
                </span>
                <span className="block text-electric-light">{hero.title.line2Accent}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[440px] text-sm font-light leading-relaxed tracking-wide text-white/75 md:mx-0 md:text-[15px]">
                {hero.description}
              </p>
              <Button to={hero.cta.to} className="mt-8">
                {hero.cta.label}
              </Button>
            </div>

            <div className="relative mx-auto h-[360px] w-full max-w-[360px] md:max-w-none lg:h-[460px] xl:h-[500px]">
              <DotGrid
                cols={12}
                rows={12}
                gap={14}
                radius={2}
                className="right-0 top-4 text-electric/25 lg:right-4"
              />
              <BlobGradient className="left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 lg:size-[420px]" />
              <HalfCircle className="bottom-2 left-[6%] w-24 -rotate-45 bg-indigo lg:left-[10%] lg:w-32" />

              <PersonFigure
                image={hero.image}
                priority
                className="absolute bottom-0 left-1/2 h-[320px] w-[220px] -translate-x-1/2 lg:h-[400px] lg:w-[272px] xl:h-[440px] xl:w-[300px]"
              />

              <DashedPath
                d="M4 86C30 20 90 62 144 8"
                className="right-2 top-0 hidden w-32 sm:block lg:w-40"
              />
              <PaperPlane className="-top-3 right-0 hidden size-6 sm:block" />
              <DashedPath
                d="M146 6C112 72 50 22 6 82"
                className="bottom-16 left-0 hidden w-28 sm:block lg:w-36"
              />
              <PaperPlane
                className="bottom-12 left-[-6px] hidden size-6 sm:block"
                iconClassName="rotate-180"
              />

              <Sticker
                src={hero.stickers.notebook}
                className="left-0 top-6 w-16 lg:left-2 lg:w-24"
                tilt="-rotate-12"
                delay="0s"
              />
              <Sticker
                src={hero.stickers.books}
                className="bottom-6 right-0 hidden w-20 sm:block lg:w-28"
                tilt="rotate-6"
                delay="-2s"
              />
              <Sticker
                src={hero.stickers.pencils}
                className="right-1 top-[34%] hidden w-14 sm:block lg:w-20"
                tilt="rotate-12"
                delay="-4s"
              />

              <Dot className="left-[22%] top-2 size-2.5 bg-electric-light" />
              <Dot className="left-1 top-[52%] size-2 bg-electric" />
              <Dot className="bottom-[30%] right-[4%] size-3 bg-indigo" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
