import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserCog, Info, BadgeHelp, GlobeLock } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen flex">
      {/* Left side: Buttons List */}
      <div className="p-4 bg-slate-600/35 ">
        <nav className="space-y-1">
          <Button variant="link" className="w-full pl-4 justify-start text-[15px] border border-muted-foreground">{<UserCog className="text-muted-foreground"/>} Account</Button>
          <Button variant="link" className="w-full pl-4 justify-start text-[15px] border border-muted-foreground">{<Info className="text-muted-foreground"/>} Info</Button>
          <Button variant="link" className="w-full pl-4 justify-start text-[15px] border border-muted-foreground">{<GlobeLock className="text-muted-foreground"/>} Privacy</Button>
          <Button variant="link" className="w-full pl-4 justify-start text-[15px] border border-muted-foreground">{<BadgeHelp className="text-muted-foreground"/>} Help</Button>
        </nav>
      </div>

      {/* Vertical Separator */}
      <Separator orientation="vertical" className="h-auto" />

      {/* Right side: Information */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <p className="text-muted-foreground">
          Here you can manage your account settings, update your personal information, 
          and adjust your privacy preferences. Select a category from the left to get started.
        </p>
      </div>
    </div>
  )
}