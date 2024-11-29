'use client'

import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
    CreditCard,
    Eye,
    Keyboard,
    Pen,
    X,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "./ui/input"
import { useToast } from "@/hooks/use-toast"
import { getS3ImageUrl } from "@/lib/utils"
import { ImageModal } from "./Image-Modal"
import { Dialog, DialogContent } from "./ui/dialog"

interface DropdownMenuDemoProps {
    checkState: boolean;
    onImageUpdate: () => void;
}
export function DropdownMenuDemo({ checkState, onImageUpdate }: DropdownMenuDemoProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { toast } = useToast()
    const supabase = createClientComponentClient()

    const fetchUserImage = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.id) {
            const { data, error } = await supabase
                .from("add-photo")
                .select("image")
                .eq("user_id", user.id)
                .order('created_at', { ascending: false }) // This orders the results by the 'created_at' column in descending order (newest first).
                .limit(1) // This limits the results to just one row (the most recent one)
                .single()

            if (error) {
                console.error("Error retrieving image path:", error)
            } else if (data?.image) {
                setImageUrl(data.image)
            }
        }
    }

    useEffect(() => {
        fetchUserImage()
    }, [])

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setImage(selectedFile)
            handleImageUpload(selectedFile)
        }
    }

    const handleImageUpload = async (file: File) => {
        setIsLoading(true)
        try {
            const uniquePath = `avatars/${uuidv4()}`
            const { data: img, error } = await supabase.storage
                .from(process.env.NEXT_PUBLIC_S3_BUCKET!)
                .upload(uniquePath, file)

            if (error) throw error

            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("No user found")

            const { error: imageErr } = await supabase.from("add-photo")
                .insert({
                    user_id: user.id,
                    user_name: user.user_metadata.name,
                    image: img?.path
                })

            if (imageErr) {
                throw imageErr
            }

            setImageUrl(img?.path || "")

            await fetchUserImage() // Fetch the latest image to ensure we're displaying the most recent one
            onImageUpdate()

            toast({
                title: "Picture updated",
                description: "Your profile picture has been successfully updated.",
                className: "bg-blue-400/50 text-lg"
            })

        } catch (error) {
            console.error("Error uploading image:", error)
            toast({
                variant: "destructive",
                title: "Upload failed",
                description: "There was an error uploading your image. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-16 w-16 cursor-pointer">
                    {checkState ? (
                        <AvatarImage 
                            className="dark:bg-white" 
                            src="https://img.icons8.com/?size=100&id=98957&format=png&color=000000" 
                            alt="Profile" 
                        />
                    ) : (
                        <AvatarImage 
                            src={imageUrl ? getS3ImageUrl(imageUrl) : "https://github.com/shadcn.png"} 
                            alt="Profile"
                            className={isLoading ? "opacity-50" : ""} 
                        />
                    )}
                    <AvatarFallback>
                        {isLoading ? "..." : ""}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            {!checkState && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-yellow-500/90"
                            >
                                <Pen className="mr-2 h-4 w-4" />
                                <span onClick={handleButtonClick}>
                                    {isLoading ? "Uploading..." : "Upload Picture"}
                                </span>
                                <Input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                    disabled={isLoading}
                                />
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            {imageUrl && (
                                    <DropdownMenuItem
                                        onSelect={() => setIsDialogOpen(true)}
                                        className="text-yellow-500/90"
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>View Picture</span>
                                        <DropdownMenuShortcut>⇧⌘V</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                )}
                            <DropdownMenuItem className="text-yellow-500/90">
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-yellow-500/90">
                                <Keyboard className="mr-2 h-4 w-4" />
                                <span>Keyboard shortcuts</span>
                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                    <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] p-0">
                        <div className="relative">
                            <img
                                src={getS3ImageUrl(imageUrl)}
                                alt="Profile Picture"
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="Close"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </DropdownMenu>
    )
}

