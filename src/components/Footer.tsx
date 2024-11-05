import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm">
              We are a company dedicated to providing innovative solutions for our customers. Our mission is to make technology accessible and beneficial for everyone.
            </p>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {["Home", "Services", "Products", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Newsletter</h2>
            <p className="text-sm mb-4">Stay up to date with our latest news and products.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white border-gray-700 focus:border-gray-600"
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}