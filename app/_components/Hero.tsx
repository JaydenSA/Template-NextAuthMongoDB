import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Hero() {

  return (
    <>
    <section className="custom-landing-overview">
      <article className="custom-landing-paragraph">
        <h1 className="custom-h1-extrabold">
          The <span className="text-primary">Smart</span> Choice For{" "}
          <span className="text-primary">Future</span>
        </h1>
        <p className="custom-p-medium custom-light-gray">
          Elearn is a global training provider based across the UK that
          specialises in accredited and bespoke training courses. We crush
          the...
        </p>
        <div className="custom-landing-contact-bar">
          <Link href={'/'} className="custom-button">Continue</Link>
        </div>
      </article>

      <Image
        src={"/landingImage.webp"}
        alt="Image of the people"
        height="550"
        width="890"
        className="custom-landing-image"
      />
    </section>
    </>
  );
}
