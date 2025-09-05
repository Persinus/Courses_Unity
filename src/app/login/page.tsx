import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.545 6.558C16.834 5.446 18.046 4 19.944 4c1.47 0 2.541 1.065 2.541 2.446 0 1.095-.65 2.11-1.468 2.893-2.14.74-.462 3.583-3.2 5.039-2.034 1.08-4.135.63-5.22.182-.54-.222-1.08-.52-1.62-.816-2.585-1.4-4.226-3.52-4.226-6.104C6.75 5.563 8.25 4 9.944 4c1.43 0 2.471 1.065 2.471 2.446 0 1.095-.65 2.11-1.468 2.893-2.14.74-.462 3.583-3.2 5.039a7.83 7.83 0 0 1-5.22.182" />
        <path d="M8.455 17.442c-1.289 1.112-2.502 2.558-4.4 2.558C2.585 20 1.515 18.935 1.515 17.554c0-1.095.65-2.11 1.468-2.893 2.14-.74.462-3.583 3.2-5.039 2.034-1.08 4.135-.63 5.22-.182.54.222 1.08.52 1.62.816 2.585 1.4 4.226 3.52 4.226 6.104C18.25 18.437 16.75 20 15.056 20c-1.43 0-2.471-1.065-2.471-2.446 0-1.095.65-2.11 1.468-2.893 2.14-.74.462-3.583 3.2-5.039a7.83 7.83 0 0 0 5.22-.182" />
      </svg>
    )
  }

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://picsum.photos/1200/1800"
          alt="Image"
          width="1200"
          height="1800"
          data-ai-hint="abstract 3d"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                <GoogleIcon className="mr-2 h-4 w-4" />
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  )
}