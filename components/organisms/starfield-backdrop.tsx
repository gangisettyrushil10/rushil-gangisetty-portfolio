export function StarfieldBackdrop() {
  return (
    <>
      <div className="starfield-root" aria-hidden>
        <div className="starlayer starlayer-far" />
        <div className="starlayer starlayer-mid" />
        <div className="starlayer starlayer-near" />
        <div className="shooting-star" />
        <div className="shooting-star b" />
      </div>
      <div className="grain" aria-hidden />
      <div className="crt-overlay" aria-hidden />
    </>
  )
}
