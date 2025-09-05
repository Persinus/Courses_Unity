
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.828 6.58C34.553 2.822 29.585 0.5 24 0.5C10.75 0.5 0.5 10.75 0.5 24S10.75 47.5 24 47.5c11.357 0 21.065-7.794 23.238-18.494z" />
        <path fill="#FF3D00" d="M6.306 14.691c2.344-4.502 6.849-7.697 12.194-8.835l-7.027 7.027z" />
        <path fill="#4CAF50" d="M24 47.5c5.94 0 11.213-2.456 14.902-6.417l-7.009-7.009c-2.328 1.587-5.114 2.532-8.096 2.532-4.753 0-8.812-2.585-10.9-6.333z" />
        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-1.428 0-2.809-.188-4.11-.525 2.126-2.525 3.42-5.613 3.42-9.016 0-3.403-1.294-6.49-3.42-9.016 1.301-.337 2.682-.525 4.11-.525 5.223 0 9.654 3.343 11.303 8H42v-0.083z" />
      </svg>
    )
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex w-full max-w-5xl overflow-hidden bg-white rounded-2xl shadow-2xl dark:bg-gray-800">
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-10 text-white bg-gray-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-wider">Selected Works</h2>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white hover:bg-white/10">Sign Up</Button>
              <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">Join Us</Button>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-4">
              <Image 
                src="https://picsum.photos/80/80"
                alt="Andrew's Avatar"
                width={64}
                height={64}
                data-ai-hint="avatar man"
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">Andrew.ui</h3>
                <p className="text-sm text-gray-400">UI & Illustration</p>
              </div>
              <div className="flex gap-2 ml-auto">
                <Button variant="ghost" size="icon" className="text-gray-400 rounded-full hover:bg-white/10 hover:text-white">
                  <ChevronRight className="transform rotate-180" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 rounded-full hover:bg-white/10 hover:text-white">
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-10 lg:w-1/2">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-xl font-bold tracking-widest text-gray-800 uppercase dark:text-white">UISOCIAL</h1>
            <Button variant="outline" size="sm" className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
              <span className="mr-2">🇬🇧</span> EN <ChevronRight className="w-4 h-4 transform rotate-90" />
            </Button>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Hi Designer</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome to UISOCIAL</p>
          </div>

          <form className="mt-10">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required className="dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm text-red-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required className="dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                  <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
                  <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              </div>

              <Button variant="outline" className="w-full dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600">
                <GoogleIcon className="w-5 h-5 mr-2" />
                Login with Google
              </Button>
              <Button type="submit" className="w-full text-white bg-red-500 hover:bg-red-600">
                Login
              </Button>
            </div>
            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link href="#" className="font-semibold text-red-500 hover:underline">
                Sign up
              </Link>
            </div>
          </form>

          <div className="flex justify-center gap-4 mt-10">
            <Link href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

    