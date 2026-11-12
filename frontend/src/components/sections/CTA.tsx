import { cta } from "../../data/content";
import { Dot } from "../decor/Shapes";
import Container from "../ui/Container";
import InlineForm from "../ui/InlineForm";
import Reveal from "../ui/Reveal";

const CTA = () => {
  // TODO: send the address to a subscription endpoint. None exists yet, so
  // submitting validates the email and does nothing else.
  const handleSubscribe = () => {};

  return (
    <section aria-labelledby="cta-title" className="py-20 md:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center md:p-14">
          <Dot className="-left-28 -top-28 size-80 bg-electric/30 blur-3xl" />
          <Dot className="-left-16 -top-16 size-48 bg-white/5" />
          <Dot className="-right-14 -top-14 size-44 bg-white/5" />
          <Dot className="-bottom-20 left-[12%] size-44 bg-white/5" />
          <Dot className="-bottom-12 -right-10 size-28 bg-indigo" />

          <div className="relative">
            <h2 id="cta-title" className="text-[28px] font-bold leading-tight text-white md:text-4xl">
              {cta.title} <span className="text-electric-light">{cta.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[460px] text-sm font-light leading-relaxed tracking-wide text-white/70 md:text-[15px]">
              {cta.description}
            </p>
            <InlineForm
              type="email"
              name="email"
              required
              label={cta.form.label}
              placeholder={cta.form.placeholder}
              buttonLabel={cta.form.button}
              onSubmit={handleSubscribe}
              className="mx-auto mt-8 max-w-[380px]"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default CTA;
