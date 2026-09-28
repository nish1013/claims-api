import { StatusBadge } from '../components/StatusBadge'
import { ClaimStatus } from '../api/interfaces/data'

interface ConnectorProps {
  leg: 'a' | 'b'
}

interface BoardRowProps {
  policy: string
  status: ClaimStatus
  fresh?: boolean
}

export function HomePage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">Insurance claims</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        A claim and its evidence, filed in one step.
      </h1>

      <div
        className="mt-12 flex flex-col items-stretch md:flex-row md:items-center"
        role="img"
        aria-label="A claim for policy INS-7856 with a photo goes to the Claims API, which saves it and lists it on the claims board as pending."
      >
        <div className="card flex-1 p-4">
          <p className="text-xs uppercase tracking-wide text-muted">New claim</p>
          <p className="mt-2 font-mono font-medium">INS-7856</p>
          <p className="mt-1 text-sm text-muted">Stone chip cracked the windscreen.</p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-md bg-raised px-2 py-1 text-xs">
            <DocIcon />
            windscreen.jpg
          </p>
        </div>

        <Connector leg="a" />

        <div className="card flex-1 border-accent/50 p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Claims API</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Tick />
              Claim saved as pending
            </li>
            <li className="flex items-center gap-2">
              <Tick />
              Document stored with it
            </li>
          </ul>
        </div>

        <Connector leg="b" />

        <div className="card flex-1 p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Claims board</p>
          <ul className="mt-2 space-y-1.5">
            <BoardRow policy="INS-7856" status={ClaimStatus.PENDING} fresh />
            <BoardRow policy="INS-4509" status={ClaimStatus.APPROVED} />
            <BoardRow policy="INS-6700" status={ClaimStatus.REJECTED} />
          </ul>
        </div>
      </div>

      <p className="mt-10 max-w-2xl text-lg text-muted">
        Pick a policy, say what happened and attach a photo or PDF. The API saves the claim, stores
        the document against it, and the claim appears on the board with its status.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/claims" className="btn-primary">
          Open the claims board
        </a>
        <a href="/how-it-works" className="btn-ghost">
          How it works
        </a>
      </div>
    </section>
  )
}

function Connector({ leg }: ConnectorProps) {
  return (
    <div className="relative mx-auto h-10 w-px bg-line md:mx-0 md:h-px md:w-14" aria-hidden="true">
      <span className={`hop ${leg === 'a' ? 'hop-a' : 'hop-b'} text-accent`}>
        <DocIcon />
      </span>
    </div>
  )
}

function BoardRow({ policy, status, fresh }: BoardRowProps) {
  return (
    <li
      className={`flex items-center justify-between rounded-md px-2 py-1 ${fresh ? 'bg-accent/10 ring-1 ring-accent/40' : ''}`}
    >
      <span className="font-mono text-sm">{policy}</span>
      <StatusBadge status={status} />
    </li>
  )
}

function DocIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <path d="M4 1.5h5l3 3v10H4z" fill="rgb(var(--surface))" />
      <path d="M9 1.5v3h3M6 8h4M6 10.5h4" />
    </svg>
  )
}

function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 text-approved"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  )
}
