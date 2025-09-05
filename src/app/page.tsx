
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Unity Codex</h1>
      <p className="text-lg text-muted-foreground mb-8">Your journey to becoming a Unity master starts here.</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Login
        </Link>
        <Link href="/dashboard" className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
