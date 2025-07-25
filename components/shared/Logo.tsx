import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <div >
            <Link href='/' className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-lg flex items-center justify-center">
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    fill
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                </div>
                <span className="text-xl font-bold bg-amber-400 bg-clip-text text-transparent">
                    FlexiConvert
                </span>
            </Link>
        </div>
    );
};

export default Logo;
