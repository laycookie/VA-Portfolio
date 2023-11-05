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

type QuestionType = "about me" | "professional";
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
            type: "about me",
            question: "Что у тебя с голосом?",
            answer: "Чаще всего этот вопрос возникает, когда меня слышат сонной, больной или после работы с лоли. От природы у меня относительно высокий голос. В совокупности с речевой позицией это может звучать специфически. Поэтому советую принять это как данность.",
        },
        {
          type: "professional",
          question: "Где ты озвучиваешь?",
            answer: "Команда MoonWalkers. Ссылка на их сайт: https://t.me/MoonWalkers_MW",
        },
        {
            type: "professional",
            question: "Какой у тебя микрофон?",
            answer: "На данный момент у меня XLR микрофон Alctron MC410 в связке со звуковой картой Behringer U-PHORIA UMC204HD.",
        },
        {
            type: "about me",
            question: "Есть ли у тебя парень/муж?",
            answer: "Да, я замужем :3",
        },
        {
            type: "professional",
            question: "Могу ли я (т.е. вы) начать озвучивать?",
            answer: "Наверное. Важно понимать, что постановка голоса и озвучка - очень кропотливое и время затратное дело. Если у вас есть дефекты речи, которые нельзя никак исправить,увы и ах : озвучка не для вас. А всё остальное можно развить и натренировать!)",
        },
        {
            type: "professional",
            question: "Скажи....(то-то: то-то).",
            answer: "Только за символическую плату ;3",
        },
        {
            type: "about me",
            question: "Какой у тебя любимый цвет?",
            answer: "Мятный",
        },
        {
            type: "professional",
            question: "Сколько ты занимаешься голосом/озвучкой?",
            answer: "Постановкой голоса занимаюсь с декабря двадцать первого года. Озвучивать начала с октября двадцать второго года.",
        }
    ]

    return (
        <main className={preahvihear.className + " container mx-auto"}>
            <h1 className="w-full text-center text-6xl mt-[10dvh]">Q&A</h1>
            <div className="flex mx-auto container text-2xl">
                <div className="w-full flex flex-col space-y-2">
                    <button className="mx-auto"
                            onClick={() => {
                                filteredQuestions === "about me" ?
                                    setFilteredQuestions(null) :
                                    setFilteredQuestions("about me");
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
                    <h2 className="mx-auto">About me</h2>
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <button className="mx-auto"
                    onClick={() => {
                        filteredQuestions === "professional" ?
                            setFilteredQuestions(null) :
                            setFilteredQuestions("professional");
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
                    <h2 className="mx-auto">Professional</h2>
                </div>
            </div>

            <Accordion type="single" className="space-y-8 my-8" collapsible>
                {questionsAndAnswers
                    .filter(qa => filteredQuestions === null || qa.type === filteredQuestions)
                    .map((qa, index) => (
                    <div
                        className={
                            `${qa.type === "about me" ?
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

