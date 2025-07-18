import Image from "next/image";

const Logo = () => {
    return (
        <div className="flex items-center gap-3">
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
                ConvertPro
            </span>
        </div>
    );
};

export default Logo;
