import { cta } from "../../data/content";
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
      className="relative overflow-hidden bg-gradient-to-b from-bg to-white py-10 sm:py-12 md:py-16"
    >
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl rounded-2xl border border-border bg-white px-4 py-7 text-center shadow-card sm:px-8 sm:py-10 md:px-10 md:py-12">
          <h2
            id="cta-title"
            className="text-[clamp(1.35rem,3.5vw,2.25rem)] font-bold leading-tight text-navy"
          >
            {cta.title} <span className="text-indigo">{cta.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[540px] text-sm font-normal leading-relaxed tracking-wide text-body md:text-[15px]">
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
            className="mx-auto mt-6 max-w-[480px]"
          />
        </Reveal>
      </Container>
    </section>
  );
};

export default CTA;
