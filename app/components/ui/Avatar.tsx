import Image from "next/image";

interface AvatarProps {
    src: string;
    alt?: string;
    size?: string;
}

export const Avatar = ({ src, alt = "User Avatar", size = "12" }: AvatarProps) => {
    return (
        <div className={`w-${size} h-${size} rounded-full overflow-hidden border-2 border-gray-300`}>
            <Image src={src} alt={alt} width={100} height={100} className="w-full h-full object-cover" />
        </div>
    );
};
