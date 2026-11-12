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
    <section
      aria-labelledby="cta-title"
      className="relative flex min-h-screen items-center overflow-hidden bg-primary py-24"
    >
      <Dot className="-left-32 top-0 size-[36rem] bg-electric/25 blur-3xl" />
      <Dot className="-left-8 top-16 size-64 bg-white/5" />
      <Dot className="bottom-12 left-[7%] size-44 bg-white/[0.07]" />
      <Dot className="-right-24 -top-20 size-[28rem] bg-indigo/50 blur-3xl" />
      <Dot className="right-[8%] top-20 size-40 bg-white/5" />
      <Dot className="-bottom-20 right-[16%] size-56 bg-electric/20 blur-2xl" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="cta-title" className="text-[32px] font-bold leading-tight text-white sm:text-[40px] md:text-[52px]">
            {cta.title} <span className="text-electric-light">{cta.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] text-sm font-light leading-relaxed tracking-wide text-white/75 md:text-[15px]">
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
            className="mx-auto mt-10 max-w-[480px]"
          />
        </Reveal>
      </Container>
    </section>
  );
};

export default CTA;
