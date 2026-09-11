type Audience = { title: string; body: string[] };

/** The "For parents" and "For students" columns that close About and the guarantee. */
export default function Audiences({ items }: { items: Audience[] }) {
  return (
    <div className="audiences">
      {items.map((a, i) => (
        <div key={a.title} className={`audience reveal${i ? " reveal--delay" : ""}`}>
          <h3 className="audience__title">{a.title}</h3>
          {a.body.map((p) => (
            <p key={p.slice(0, 24)} className="audience__body">
              {p}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
