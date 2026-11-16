import CourseCatalog from './components/CourseCatalog';

export default function App() {
  return (
    <div className="min-h-screen bg-mist font-sans text-ink">
      <nav className="site-nav">
        <span className="font-display text-xl font-bold">სწავლა+</span>
        <span className="text-sm text-white/70">ციფრული განათლების პლატფორმა</span>
      </nav>
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
        <CourseCatalog />
      </main>
    </div>
  );
}
