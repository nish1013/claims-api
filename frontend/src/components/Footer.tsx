export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted">
        © {new Date().getFullYear()}{' '}
        <a
          href="https://satharasinghe.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-ink"
        >
          satharasinghe.com
        </a>
      </div>
    </footer>
  )
}
