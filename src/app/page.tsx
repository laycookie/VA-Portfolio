import Image from 'next/image'
import PreattyCircle from "@/components/PreattyCircle";
import {Indie_Flower} from "next/font/google";
const indieFlower = Indie_Flower({
    subsets: ['latin'],
    weight: ["400"],
})

export default function Home() {
    return (
        <main className={indieFlower.className}>
            <section className="w-full h-[100vh]">
                <div className="mt-[20dvh] flex justify-center">
                    <div className="my-auto">
                        <PreattyCircle color={"FFCBCB"} rotateDeg={240} className={"absolute -z-10"} scale={2}
                        transformX={30}/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="688" height="274" viewBox="0 0 688 274"
                             fill="none">
                            <path
                                id="signature"
                                d="M3 244.775C45.9363 287.712 82.4374 276.322 104.037 222.321C120.905 180.151 128.331 136.592 140.924 93.2145C147.785 69.5792 154.556 47.4856 154.556 22.8472C154.556 15.118 150.646 3 141.926 3C132.474 3 124.174 57.5318 122.881 65.5487C118.174 94.7342 114.947 128.576 118.671 158.369C121.171 178.363 130.138 198.784 139.921 215.906C148.114 230.244 155.099 255.535 174.202 259.009C194.144 262.635 217.713 229.097 226.123 214.904C237.956 194.936 241.159 172.725 241.159 149.749C241.159 132.902 245.913 120.308 230.333 112.059C223.693 108.543 214.619 104.04 206.878 104.04C187.819 104.04 169.096 107.649 150.947 107.649C86.4869 107.649 162.591 268.425 228.73 246.379C245.098 240.922 259.099 233.309 271.831 223.123C281.108 215.701 280.852 176.76 280.852 188.641C280.852 243.031 315.834 275.658 374.071 269.834C388.252 268.416 401.6 215.834 405.143 204.88C407.612 197.249 408.731 179.126 415.167 173.405C416.788 171.964 422.925 196.421 423.386 198.264C427.225 213.619 430.027 228.988 435.214 243.973C436.192 246.799 442.116 221.048 443.433 216.307C447.134 202.985 475.048 155.734 495.355 171.4C507.638 180.876 514.279 195.617 521.015 209.09C523.776 214.611 532.743 246.206 539.459 242.369C556.184 232.811 566.318 212.735 580.354 199.868C588.388 192.503 602.569 172.603 614.635 172.603C628.019 172.603 635.229 179.461 643.904 189.644C655.766 203.569 660.218 220.098 669.764 235.152C675.478 244.163 681.423 227.893 685 223.123"
                                stroke="#804040" strokeWidth="6" strokeLinecap="round"/>
                        </svg>
                        <PreattyCircle color={"D0FFCC"} rotateDeg={80} className={"absolute -z-10 flex"} scale={2}
                        transformX={-290} transformY={40}/>
                        <h1 className="text-3xl mt-8 transition fade-in fromBottom"
                        >{"Hello my name is ___ and I'm a voice actress."}</h1>
                    </div>
                    <Image src={"/Koto_Katakura.webp"} alt={"VA anime girl"}
                           className={"-z-10 h-[768px] w-auto"}
                           width={1725.330}
                           height={768}
                    priority={true}
                    />
                </div>
            </section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#FFCBCB" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" data-darkreader-inline-fill=""></path>
            </svg>
            <section className="bg-gradient-to-r from-bublegum to-bublegum-grad-shift">
                <h1>Clips</h1>
                <div className="flex">
                    <div>
                        <p>img</p>
                    </div>
                    <div>
                        <p>img</p>
                        <p>Those some of my favorite clips that I have voiced.</p>
                    </div>
                </div>
            </section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={"absolute"}>
                <path fill="#FFCBCB" fillOpacity="1" d="M0,128L48,149.3C96,171,192,213,288,218.7C384,224,480,192,576,160C672,128,768,96,864,106.7C960,117,1056,171,1152,192C1248,213,1344,203,1392,197.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" data-darkreader-inline-fill=""></path>
            </svg>
            <section className="bg-gradient-to-l from-watermelon to-watermelon-grad-shift pt-[200px]">
                <h1>Clips</h1>
                <div className="flex">
                    <div>
                        <p>img</p>
                        <p>Those some of my favorite clips that I have voiced.</p>
                    </div>
                    <div>
                        <p>img</p>
                    </div>
                </div>
            </section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#D0FFCC" fillOpacity="1" d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,154.7C672,128,768,128,864,144C960,160,1056,192,1152,181.3C1248,171,1344,117,1392,90.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" data-darkreader-inline-fill=""></path>
            </svg>
            <section>
                <h1>Contact me</h1>
                <p>Email: Lorem@Ipsum.com</p>
            </section>
        </main>
    )
}
