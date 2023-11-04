"use client";

import {Preahvihear, Indie_Flower} from 'next/font/google'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {useState} from "react";

const preahvihear = Preahvihear({
    subsets: ['latin'],
    weight: ["400"],
})
const indieFlower = Indie_Flower({
    subsets: ['latin'],
    weight: ["400"],
})

type Props = {}

type QuestionType = "about my voice" | "about me personally";
type QuestionAndAnswer = {
    type: QuestionType;
    question: string;
    answer: string;
}

export default function Page({}: Props) {
    const [filteredQuestions, setFilteredQuestions] =
        useState<null | QuestionType>(null)

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
                    <button className="mx-auto"
                            onClick={() => {
                                filteredQuestions === "about my voice" ?
                                    setFilteredQuestions(null) :
                                    setFilteredQuestions("about my voice");
                            }}>
                        <div className="
                        h-24 w-24 bg-gradient-to-tl from-bublegum to-bublegum-grad-shift rounded-xl
                        shadow-md hover:shadow-xl transition-shadow">
                            <Image src={"/voiceImg.png"} alt={"About me"}
                                   width={128}
                                   height={128}
                                   className="scale-[0.45] -translate-y-5"
                            />
                        </div>
                    </button>
                    <h2 className="mx-auto">About my voice</h2>
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <button className="mx-auto"
                    onClick={() => {
                        filteredQuestions === "about me personally" ?
                            setFilteredQuestions(null) :
                            setFilteredQuestions("about me personally");
                    }}>
                        <div className="
                        h-24 w-24 bg-gradient-to-tr from-watermelon to-watermelon-grad-shift rounded-xl
                        shadow-md hover:shadow-xl transition-shadow">
                            <Image src={"/aboutImg.png"} alt={"About me"}
                                   width={128}
                                   height={128}
                                   className="scale-50 -translate-y-3"
                            />
                        </div>
                    </button>
                    <h2 className="mx-auto">About me personall</h2>
                </div>
            </div>

            <Accordion type="single" className="space-y-8 mt-8" collapsible>
                {questionsAndAnswers
                    .filter(qa => filteredQuestions === null || qa.type === filteredQuestions)
                    .map((qa, index) => (
                    <div
                        className={
                            `${qa.type === "about my voice" ?
                                "bg-gradient-to-r from-bublegum to-bublegum-grad-shift" :
                                "bg-gradient-to-l from-watermelon to-watermelon-grad-shift"} rounded-2xl p-4
                                       border-black border-2 shadow-md hover:shadow-xl transition-shadow`}
                        key={index}>
                        <AccordionItem value={`item-${index}`} className="border-black border-b-2">
                            <AccordionTrigger
                                className="text-2xl font-bold">{qa.question}</AccordionTrigger>
                            <AccordionContent
                                className={`text-xl ${indieFlower.className}`}>
                                {qa.answer}
                            </AccordionContent>
                        </AccordionItem>
                    </div>

                ))}
            </Accordion>

        </main>
    );
}

