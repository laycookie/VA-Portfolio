import {Preahvihear} from 'next/font/google'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import DropDownArrow from "@/components/DropDownArrow";

const preahvihear = Preahvihear({
    subsets: ['latin'],
    weight: ["400"],

})

type Props = {}

type QuestionAndAnswer = {
    type: "about my voice" | "about me personally";
    question: string;
    answer: string;
}

export default function Page({}: Props) {
    const questionsAndAnswers: QuestionAndAnswer[] = [
        {
            type: "about my voice",
            question: "Why is my voice so high pitched?",
            answer: "I don't know, I was born with it.",
        },
        {
            type: "about me personally",
            question: "What is your favorite color?",
            answer: "Mint",
        }
    ]

    return (
        <main className={preahvihear.className + " container mx-auto"}>
            <h1 className="w-full text-center text-6xl mt-[10dvh]">Q&A</h1>
            <div className="flex mx-auto container text-2xl">
                <div className="w-full flex flex-col space-y-2">
                    <button className="mx-auto">
                        <div className="
                        h-24 w-24 bg-gradient-to-tl from-bublegum to-bublegum-grad-shift rounded-xl
                        shadow-md hover:shadow-xl transition-shadow"/>
                    </button>
                    <h2 className="mx-auto">About my voice</h2>
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <button className="mx-auto">
                        <div className="
                        h-24 w-24 bg-gradient-to-tr from-watermelon to-watermelon-grad-shift rounded-xl
                        shadow-md hover:shadow-xl transition-shadow"/>
                    </button>
                    <h2 className="mx-auto">About me personall</h2>
                </div>
            </div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="space-y-8 mt-8">
                {questionsAndAnswers.map((qa, index) => (
                    <div key={index} className={
                        `${qa.type === "about my voice" ?
                            "bg-gradient-to-r from-bublegum to-bublegum-grad-shift" :
                            "bg-gradient-to-l from-watermelon to-watermelon-grad-shift"} rounded-2xl p-4`
                    }>
                        <button className={"w-full flex justify-between"}>
                            <h3 className={"text-2xl font-bold"}>{qa.question}</h3>
                            <DropDownArrow/>
                        </button>
                        <div className={"mb-2 h-1 w-full bg-black"}/>
                        <p>{qa.answer}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

