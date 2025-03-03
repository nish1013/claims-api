export function Navbar() {
  return (
    <nav className="w-full flex justify-end space-x-6 p-4 text-blue-400">
      <a href="https://github.com/nish1013/claims-api" target="_blank" className="hover:underline">
        Code
      </a>
      <a
        href="https://claims-api-production.up.railway.app/api"
        target="_blank"
        className="hover:underline"
      >
        API
      </a>
      <a href="https://satharasinghe.com" target="_blank" className="hover:underline">
        Contact
      </a>
    </nav>
  )
}
