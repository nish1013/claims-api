import { LocationProvider, Route, Router } from 'preact-iso'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/Home'
import { ClaimsPage } from './pages/Claims'
import { HowItWorksPage } from './pages/HowItWorks'
import { NotFoundPage } from './pages/NotFound'

export function App() {
  return (
    <LocationProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Router>
            <Route path="/" component={HomePage} />
            <Route path="/claims" component={ClaimsPage} />
            <Route path="/how-it-works" component={HowItWorksPage} />
            <Route default component={NotFoundPage} />
          </Router>
        </main>
        <Footer />
      </div>
    </LocationProvider>
  )
}
