import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

const members = [
    {
        id: 1,
        name: 'Kim D',
        imageUrl: 'https://avatars.githubusercontent.com/u/86911985?v=4',
        email: 'myemail@gmail.com'
    },
]

export function WorkspaceMemebersList() {
    return (
        <div className="space-y-0.5 py-1">
            {members.map((member) => (
                <div 
                    key={member.id}
                    className="px-3 py-2 hover:bg-accent cursor-pointer transition-colors flex items-center space-x-3" 
                >
                    <div className="relative">
                        <Avatar className="size-8 relative">
                            <Image 
                                src={member.imageUrl} alt='user image' 
                                className="object-cover" fill
                            />
                            <AvatarFallback>
                                {member.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}