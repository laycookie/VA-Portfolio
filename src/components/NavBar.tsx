"use client";

import {useRouter} from "next/navigation";
import {useRef} from "react";

type Props = {
    className?: string;
    href: string;
    text: string;
}

export default function NavBar({className, href, text}: Props) {
    const transitionAnimationDiv = useRef<HTMLDivElement>(null);

    const {push} = useRouter();
    return (
        <>
            <nav className={className}>
                <button className="text-3xl font-bold link"
                        onClick={() => {
                            if (!transitionAnimationDiv.current) return;
                            // make transition animation div full screen
                            transitionAnimationDiv.current.style.height = "100vh";
                            setTimeout(() => {
                                push(href);
                            }, 700);
                        }}>
                    {text}
                </button>
            </nav>

            <div className="fixed bg-white left-0 top-0 w-[100vw] h-0 z-[100]
            transition-all duration-700 ease-in-out" ref={transitionAnimationDiv}/>
        </>
    )
}
