import { API_DOCS_URL } from '../api/config'

const STEPS = [
  {
    title: 'File the claim',
    body: 'Pick a policy and say what happened. The claim is saved with the status pending.',
  },
  {
    title: 'Attach the evidence',
    body: 'One photo or PDF goes with the claim. It is stored and linked to that claim, so the two never drift apart.',
  },
  {
    title: 'See it on the board',
    body: 'The claims board lists every claim with its policy and status. Anyone can see it without signing in.',
  },
  {
    title: 'Get a decision',
    body: 'A claim moves from pending to approved or rejected when a signed-in user updates it through the API.',
  },
]

const RULES = [
  'Anyone can read the board. Only a signed-in user can file or change a claim.',
  'A sign-in lasts a short time. When it runs out, sign in again.',
  'Evidence must be a PNG, JPEG or PDF file.',
  'Each visitor has a request limit per minute, so a burst of requests is refused until it resets.',
]

export function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">How it works</h1>
      <p className="mt-3 text-lg text-muted">From a claim to a decision, in four steps.</p>

      <ol className="mt-10 space-y-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-semibold text-accent">
              {i + 1}
            </span>
            <div>
              <h2 className="font-semibold">{step.title}</h2>
              <p className="mt-1 text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 text-xl font-semibold">The rules</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
        {RULES.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>

      <h2 className="mt-14 text-xl font-semibold">Try it</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted">
        <li>
          Open the{' '}
          <a href="/claims" className="text-accent hover:underline">
            claims board
          </a>
          . It loads without signing in.
        </li>
        <li>Sign in, choose policy INS-7856, describe the damage and attach a photo.</li>
        <li>Submit. The claim appears on the board as pending.</li>
        <li>
          Open the{' '}
          <a
            href={API_DOCS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            API docs
          </a>{' '}
          and update the claim to approved. Reload the board to see the new status.
        </li>
      </ol>
    </div>
  )
}
