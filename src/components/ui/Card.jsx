import TextType from "../libraries/TextType";
import ProfileImage from "../../assets/profile-card-image.png"

export default function Card () {
    return (
        <div className="relative w-xl h-192 rounded-4xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={ProfileImage} className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60"></div>
            <div className="absolute top-8 w-full text-center text-white">
                <h1 className="text-5xl font-bold">Bobby A. Flennoy</h1>
                <TextType 
                    text={["UX Researcher", "Software Developer", "Product Manager"]}
                    className="text-xl text-white/70"
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <img src={ProfileImage} className="w-12 h-12 rounded-full object-cover" />
                    <div className="text-white text-lg">
                        <div className="font-medium">@bobbycodes</div>
                        <div className="text-white/50 text-sm">Online</div>
                    </div>
                </div>
                <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-xl">
                    Contact Me
                </button>
            </div>
        </div>
    );
}