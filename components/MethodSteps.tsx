import CaseShot from "@/components/CaseShot";
import CaseVideo from "@/components/CaseVideo";
import { links } from "@/lib/links";
import { genericChapters, methodSteps, rankedConcepts } from "@/lib/method";

/** The four steps in full, one section each, as shown on /method. */
export default function MethodSteps() {
  return (
    <div className="steps">
      {methodSteps.map((s, i) => (
        <section key={s.num} className={`expertise${i % 2 ? " expertise--soft" : ""}`} data-ui="light">
          <div className="container">
            <div className="expertise__head">
              <div className="expertise__aside reveal">
                <a className="pill" href={links.diagnostic}>
                  {s.pill}
                </a>
              </div>
              <div className="expertise__body reveal reveal--delay">
                <h2 className="h2">{s.title}</h2>
                <p>{s.text}</p>
              </div>
            </div>

            <div className="cases">
              {s.shots.map((shot, j) => (
                <CaseShot
                  key={shot.title}
                  className={j ? "reveal reveal--delay" : "reveal"}
                  href={links.diagnostic}
                  src={shot.src}
                  alt={shot.alt}
                  title={shot.title}
                  sub={shot.sub}
                />
              ))}
              {s.video && <CaseVideo className="reveal reveal--delay" />}
              {s.compare && (
                <>
                  <div className="case case--plan reveal">
                    <div className="case__media plan plan--generic">
                      <div className="plan__head">
                        <span className="plan__name">Generic study plan</span>
                        <span className="plan__desc">Fixed chapter order. Same sequence for every student.</span>
                      </div>
                      <ol className="plan__list">
                        {genericChapters.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ol>
                      <span className="plan__more">+19 more</span>
                    </div>
                    <div className="case__caption">
                      <span className="case__title">Generic study plan</span>
                      <span className="case__sub">Every student, same order</span>
                    </div>
                  </div>
                  <div className="case case--plan reveal reveal--delay">
                    <div className="case__media plan plan--wooster">
                      <div className="plan__head">
                        <span className="plan__name">Wooster study plan</span>
                        <span className="plan__desc">
                          Personalized priority order. Your first focus area drives the biggest score upside.
                        </span>
                      </div>
                      <ol className="plan__list plan__list--ranked">
                        {rankedConcepts.map(([name, pts]) => (
                          <li key={name}>
                            <span>{name}</span>
                            <b>{pts}</b>
                          </li>
                        ))}
                      </ol>
                      <span className="plan__more">+23 more concepts unlock after your diagnostic</span>
                    </div>
                    <div className="case__caption">
                      <span className="case__title">Wooster study plan</span>
                      <span className="case__sub">Ranked by your projected point gain</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
