export function StarfieldBackdrop() {
  return (
    <>
      <div className="starfield-root" aria-hidden>
        <div className="starlayer starlayer-far" />
        <div className="starlayer starlayer-mid" />
      </div>
      <div className="crt-overlay" aria-hidden />
    </>
  )
}
