"use client"

import { cn } from "@/lib/utils";
import { ArrowRight, Building2, ChevronLeft, Command, Globe, LinkIcon, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";


interface Props {
    businessName: string;
    websiteUrl: string;
    externalLinks: string;
}


const STEPS = [
    {
        id: 'name',
        label: "Business Name",
        question: "What is the name of your organization?",
        description: "This will be the identity of yours Ai assistant",
        icon: Building2,
        placeholder: "e.g. Acme Corp",
        type: "text",
        field: "businessName" as keyof Props
    },
    {
        id: 'website',
        label: "website",
        question: "What is your website URL ?",
        description: "we will scrape data from here to train your chatbot.",
        icon: Globe,
        placeholder: "https://acme.com",
        type: "url",
        field: "websiteUrl" as keyof Props
    },
    {
        id: 'links',
        label: "Extra Context",
        question: "Any other links to add ?",
        description: "Ass external links like Notion pages or Help docs to",
        icon: LinkIcon,
        placeholder: "https://notion.so/docs..",
        type: "textarea",
        field: "externalLinks" as keyof Props
    },
]


const InitialForm = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<Props>({
        businessName: "",
        websiteUrl: "",
        externalLinks: ""
    })

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
    const progress = ((currentStep + 1) / STEPS.length) * 100;

    const stepData = STEPS[currentStep]
    const Icon = stepData.icon

    useEffect(() => {
        setTimeout(() => {

            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 300)
    }, [currentStep])

    const isStepValid = currentStep >= 2 || (formData[stepData.field] && formData[stepData.field].trim() !== "")


    
    const handleBack = () => {
        if (currentStep === 0) {
            return
        }
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentStep((prev) => prev - 1)
            setIsAnimating(false)

        }, 300)
    }


    const handleNext = () => {

        if (isSubmitting) {
            return
        }

        const currentField = STEPS[currentStep].field;
        const value = formData[currentField]

        if (currentStep < 2 && (!value || value.trim() === "")) {
            return
        }

        if (currentStep < STEPS.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => prev + 1)
                setIsAnimating(false)
            }, 300)
        } else {
            handleSubmit()
        }


    }



    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (STEPS[currentStep].type === 'textarea') {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                handleNext();
            }
            return
        }

        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleNext();
        }
    }


    const handleSubmit = async () => {
        setIsSubmitting(true)

        console.log("formdata",formData)

        const response = await fetch('/api/metadata/store',{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },

            body:JSON.stringify({
                business_name: formData.businessName,
                website_url: formData.websiteUrl,
                external_links: formData.externalLinks
            })
      
        })

        await  response.json()
        setIsSubmitting(false);
        window.location.reload()

    }


    return (
        <div className="w-full max-w-xl mx-auto min-h-100 flex flex-col justify-center">
            <div className="fixed top-0 left-0 w-full h-1 bg-white/5">
                <div
                    className="h-full bg-indigo-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="fixed top-6 right-6 md:top-8 md:ri8 text-xs font-medium text-zinc-600 uppercase tracking-widest pointer-none: fade-in">
                setup your account
            </div>
            {
                isSubmitting ? (
                    <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
                        <div className="mb-8">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
                            <div className="relative w-16 h-16 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg inset-shadow-indigo-500">
                                <Sparkles className="w-8 h-8 text-white animate-bounce" />
                            </div>
                            <h2 className="text-2xl font-medium mb-2">
                                Storing your organization info
                            </h2>
                            <p className="text-zinc-500">Scanning {formData.websiteUrl}...</p>
                        </div>
                    </div>
                ) : (
                    <div className={cn("transition-all duration-300 ease-in-out transform",
                        isAnimating ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
                    )}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                {currentStep > 0 && (
                                    <Button
                                        variant={"ghost"}
                                        size={"icon"}
                                        onClick={handleBack}
                                        className="text-zinc-500 
                                  rounded-full hover:bg-white/5 -ml-2 w-8 h-8 hover:text-zinc-300"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </Button>
                                )}
                                <span className="text-xs font-medium text-indigo-400 uppercase">
                                    Step {currentStep + 1} of {STEPS.length}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl   md:text-4xl font-medium text-white leading-tight">
                                    {stepData.question}
                                </h1>
                                <p className="text-lg text-zinc-500 font-light">
                                    {stepData.description}
                                </p>
                            </div>
                            <div className="relative group">
                                {stepData.type === "textarea" ? (
                                    <Textarea
                                        ref={inputRef as any}
                                        value={formData[stepData.field] as string}
                                        onChange={(e) => (
                                            setFormData({
                                                ...formData,
                                                [stepData.field]: e.target.value
                                            })
                                        )}
                                        onKeyDown={handleKeyDown}
                                        placeholder={stepData.placeholder}
                                        className="w-full bg-transparent border-0 border-b border-white/10 text-white "
                                        autoFocus
                                    />
                                ) : (
                                    <Input
                                        ref={inputRef as any}
                                        value={formData[stepData.field] as string}
                                        onChange={(e) => (
                                            setFormData({
                                                ...formData,
                                                [stepData.field]: e.target.value
                                            })
                                        )}
                                        onKeyDown={handleKeyDown}
                                        placeholder={stepData.placeholder}
                                        className="w-full bg-transparent border-0 border-b border-white/10 text-white  md:text-2xl text-xl placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-indigo-500 h-auto shadow-none transition-colors"
                                        autoFocus
                                    />
                                )
                                }

                                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600">
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-8">
                                <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-600">
                                    {
                                        stepData.type === "textarea" ? (
                                            <>
                                                <Command className="w-3 h-3" />
                                                <span> + Enter </span>
                                            </>
                                        ) : (
                                            <span>Press Enter </span>
                                        )
                                    }
                                    <span className="ml-1">To continue</span>
                                </div>
                                <Button
                                    onClick={handleNext}
                                    disabled={!isStepValid}
                                    className={cn("rounded-full px-8 py-6 text-base font-medium transition-all duration-300",
                                        !isStepValid
                                            ? "bg-zinc-800 text-zinc-500 hover:bg-zinc-800 cursor-not-allowed"
                                            : "bg-white text-black hover:bg-zinc-200 hover:shadow-lg "
                                    )}
                                >
                                    {currentStep === STEPS.length - 1 ? "Submit" : "Continue"}
                                    {currentStep === STEPS.length - 1 ? (
                                        <Sparkles className="w-4 h-4 ml-2" />
                                    ) : (
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    )}
                                </Button>

                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default InitialForm
