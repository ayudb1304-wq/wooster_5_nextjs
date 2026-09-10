import Image, { type StaticImageData } from "next/image";

type Props = {
  href: string;
  src: StaticImageData;
  alt: string;
  title: string;
  sub: string;
  className?: string;
};

/** Case card with a product screenshot. */
export default function CaseShot({ href, src, alt, title, sub, className = "" }: Props) {
  return (
    <a className={`case ${className}`.trim()} href={href}>
      <div className="case__media case__media--shot">
        <Image src={src} alt={alt} sizes="(max-width: 960px) 100vw, 590px" placeholder="blur" />
        <span className="case__plus" aria-hidden="true">
          +
        </span>
      </div>
      <div className="case__caption">
        <span className="case__title">{title}</span>
        <span className="case__sub">{sub}</span>
      </div>
    </a>
  );
}
