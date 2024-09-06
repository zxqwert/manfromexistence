"use client";

import React, { PropsWithChildren, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import type { SVGProps } from "react";
import Image from "next/image"
export interface DockProps extends VariantProps<typeof dockVariants> {
    className?: string;
    magnification?: number;
    distance?: number;
    direction?: "top" | "middle" | "bottom";
    children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
    "mx-auto w-max mt-8 h-[58px] p-2 flex gap-2 rounded-2xl border supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
    (
        {
            className,
            children,
            magnification = DEFAULT_MAGNIFICATION,
            distance = DEFAULT_DISTANCE,
            direction = "bottom",
            ...props
        },
        ref,
    ) => {
        const mouseX = useMotionValue(Infinity);

        const renderChildren = () => {
            return React.Children.map(children, (child: any) => {
                return React.cloneElement(child, {
                    mouseX: mouseX,
                    magnification: magnification,
                    distance: distance,
                });
            });
        };

        return (
            <motion.div
                ref={ref}
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                {...props}
                className={cn(dockVariants({ className }), {
                    "items-start": direction === "top",
                    "items-center": direction === "middle",
                    "items-end": direction === "bottom",
                })}
            >
                {renderChildren()}
            </motion.div>
        );
    },
);

Dock.displayName = "Dock";

export interface DockIconProps {
    size?: number;
    magnification?: number;
    distance?: number;
    mouseX?: any;
    className?: string;
    children?: React.ReactNode;
    props?: PropsWithChildren;
}

const DockIcon = ({
    size,
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    mouseX,
    className,
    children,
    ...props
}: DockIconProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const distanceCalc = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(
        distanceCalc,
        [-distance, 0, distance],
        [40, magnification, 40],
    );

    let width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className={cn(
                "flex aspect-square cursor-pointer items-center justify-center rounded-full",
                className,
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

DockIcon.displayName = "DockIcon";

const RaspberryPI = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="1em" height="1em" {...props}><path d="M74.19.005c-1.77.055-3.676.708-5.838 2.415C63.057.377 57.922-.332 53.33 3.826c-7.091-.919-9.395.978-11.141 3.194-1.557-.032-11.648-1.6-16.275 5.303-11.629-1.376-15.305 6.841-11.141 14.502-2.375 3.677-4.836 7.309.718 14.319-1.965 3.904-.747 8.139 3.882 13.265-1.222 5.488 1.18 9.36 5.486 12.378-.806 7.51 6.887 11.876 9.184 13.433.882 4.376 2.72 8.505 11.507 10.789 1.449 6.521 6.73 7.648 11.844 9.017-16.901 9.824-31.396 22.75-31.297 54.466l-2.476 4.417c-19.379 11.785-36.815 49.664-9.55 80.453 1.781 9.637 4.768 16.56 7.427 24.221 3.978 30.873 29.937 45.328 36.783 47.037C68.315 318.26 79 325.512 93.46 330.591c13.631 14.06 28.399 19.417 43.247 19.408.218 0 .439.003.657 0 14.849.009 29.616-5.349 43.248-19.408 14.459-5.079 25.146-12.331 35.179-19.974 6.847-1.709 32.806-16.164 36.783-47.037 2.659-7.661 5.646-14.584 7.427-24.221 27.265-30.791 9.83-68.672-9.551-80.458l-2.479-4.416c.098-31.713-14.396-44.64-31.297-54.466 5.113-1.369 10.395-2.495 11.843-9.017 8.786-2.284 10.626-6.413 11.507-10.789 2.297-1.556 9.99-5.922 9.185-13.433 4.306-3.018 6.708-6.89 5.485-12.378 4.629-5.125 5.848-9.36 3.883-13.265 5.555-7.006 3.09-10.639.719-14.316 4.161-7.662.488-15.878-11.145-14.502-4.627-6.903-14.715-5.335-16.275-5.303-1.746-2.215-4.049-4.113-11.139-3.194-4.593-4.157-9.727-3.448-15.023-1.406-6.289-4.962-10.45-.984-15.203.52-7.614-2.488-9.355.92-13.096 2.308-8.304-1.754-10.827 2.065-14.808 6.098l-4.63-.092c-12.524 7.381-18.746 22.41-20.952 30.135-2.207-7.727-8.414-22.756-20.936-30.135l-4.63.092c-3.986-4.032-6.509-7.852-14.813-6.098C92.907 3.858 91.17.45 83.552 2.938c-3.12-.987-5.989-3.039-9.368-2.934l.006.001z" /><path fill="#BC1142" fillRule="evenodd" d="M177.65 253.658v-.391c-.119-20.27-18.029-36.609-40.01-36.5-21.979.101-39.709 16.621-39.59 36.891v.39c.11 20.271 18.03 36.61 40.01 36.5 21.981-.1 39.701-16.62 39.59-36.89zm-62.83-104.84c-16.489-10.811-40.26-3.83-53.079 15.57-12.83 19.41-9.86 43.9 6.64 54.7 16.49 10.811 40.25 3.84 53.08-15.57 12.82-19.411 9.85-43.9-6.641-54.7zm44.511-1.961c-16.49 10.811-19.47 35.301-6.64 54.702 12.819 19.41 36.59 26.379 53.08 15.58 16.489-10.811 19.459-35.301 6.64-54.702-12.83-19.41-36.591-26.379-53.08-15.58zM32.392 166.478c-29.54 16.87-24.41 54.411-8.471 67.23 14.49 6.431 26.28-72 8.471-67.23zm205.769-.98c-17.81-4.77-6.011 73.67 8.47 67.231 15.939-12.811 21.07-50.361-8.47-67.231zm-60.5-58.4c-11.32 1.9 54.25 59.16 55.26 46.38 1.04-33.32-24.53-51.57-55.26-46.38zm-84.9-.98c-30.729-5.19-56.289 13.069-55.26 46.39 1.01 12.769 66.58-44.49 55.26-46.39zm44.139-7.77c-18.34-.48-35.939 13.61-35.979 21.78-.05 9.931 14.5 20.101 36.11 20.351 22.06.16 36.14-8.131 36.21-18.381.079-11.61-20.07-23.931-36.341-23.75zm1.121 203.6c-15.891-.39-40.261 6.37-39.961 15.03-.25 5.91 19.131 22.959 38.9 22.109 19.09.33 38.811-16.699 38.55-24.23-.039-7.759-21.499-13.599-37.489-12.909zm-59.06-45.969c-13.061-15.16-30.029-24.201-41.02-17.51-7.351 5.59-8.69 24.619 1.77 43.319 15.51 22.29 37.34 24.521 46.33 19.101 9.5-7.101 4.311-31.201-7.08-44.91zm115.84-4.361c-12.32 14.43-19.17 40.75-10.189 49.22 8.59 6.59 31.649 5.67 48.689-17.97 12.37-15.88 8.221-42.39 1.16-49.431-10.5-8.119-25.561 2.271-39.66 18.181z" clipRule="evenodd" /><path fill="#75A928" fillRule="evenodd" d="M49.247 32.48c25.851 8.78 49.17 20.491 68.71 36.6 22.939-10.85 7.12-38.21-4.07-49.07-.57 2.87-1.209 4.68-1.949 5.22-3.641-3.97-6.621-8.03-11.311-11.85-.02 2.24 1.11 4.68-1.68 6.46-2.52-3.44-5.92-6.51-10.44-9.11 2.181 3.81.38 4.96-.79 6.54-3.449-3-6.729-6.04-13.09-8.4 1.74 2.15 4.17 4.25 1.59 6.72-3.55-2.25-7.119-4.5-15.56-6.1 1.899 2.15 5.84 4.3 3.45 6.46-4.461-1.73-9.391-2.99-14.851-3.72 2.61 2.19 4.79 4.32 2.65 6.01-4.771-1.49-11.34-3.49-17.77-1.76l4.07 4.15c.45.56-9.52.43-16.09.53 2.4 3.39 4.84 6.65 6.27 12.47-.65.67-3.91.29-6.98 0 3.15 6.73 8.62 8.43 9.9 11.31-1.93 1.48-4.6 1.1-7.52.09 2.27 4.75 7.03 8 10.79 11.85-.95.681-2.61 1.091-6.54.62 3.47 3.74 7.67 7.17 12.64 10.25-.88 1.04-3.91.99-6.72 1.061 4.51 4.479 10.3 6.799 15.74 9.729-2.71 1.88-4.65 1.44-6.72 1.41 3.839 3.21 10.38 4.88 16.44 6.81-1.149 1.82-2.3 2.32-4.771 2.83 6.42 3.61 15.621 1.96 18.211 3.801-.62 1.81-2.391 2.989-4.51 3.979 10.34.61 38.609-.38 44.029-22.101C101.796 63.46 82.476 49.61 49.247 32.48zm176.309 0c-33.219 17.13-52.539 30.98-63.119 42.79 5.42 21.721 33.689 22.711 44.029 22.101-2.119-.99-3.889-2.17-4.51-3.979 2.59-1.841 11.791-.19 18.211-3.801-2.471-.51-3.621-1.01-4.771-2.83 6.061-1.93 12.602-3.6 16.441-6.81-2.07.03-4.01.47-6.721-1.41 5.439-2.931 11.23-5.25 15.74-9.729-2.811-.07-5.84-.021-6.721-1.061 4.971-3.08 9.17-6.51 12.641-10.25-3.93.471-5.59.061-6.539-.62 3.76-3.851 8.52-7.1 10.789-11.85-2.92 1.01-5.59 1.39-7.52-.09 1.279-2.88 6.75-4.58 9.9-11.31-3.07.29-6.33.67-6.98 0 1.43-5.82 3.879-9.09 6.279-12.47-6.58-.1-16.549.03-16.1-.53l4.07-4.16c-6.42-1.73-13 .28-17.77 1.77-2.141-1.69.039-3.83 2.648-6.01-5.459.73-10.389 1.98-14.85 3.71-2.379-2.15 1.551-4.3 3.451-6.45-8.441 1.6-12.012 3.85-15.561 6.1-2.58-2.47-.15-4.57 1.59-6.72-6.359 2.36-9.641 5.4-13.09 8.4-1.17-1.58-2.971-2.74-.791-6.54-4.52 2.6-7.92 5.67-10.43 9.1-2.799-1.78-1.67-4.21-1.68-6.45-4.699 3.82-7.68 7.88-11.32 11.85-.73-.54-1.379-2.35-1.949-5.22-11.189 10.86-27.01 38.221-4.061 49.07 19.524-16.11 42.844-27.821 68.694-36.601z" clipRule="evenodd" /></svg>;


export default function IOSDOCk() {
    return (
        <div className="relative">
            <Dock magnification={60} distance={100}>
                <DockIcon className="p-3 bg-primary-foreground rounded-full">
                    <Image src={"/manfromexistence/ai-dark.svg"} height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full">
                    <Image src={"/manfromexistence/algorithm-dark.svg"} height={75} width={75} alt="ai" />
                </DockIcon>
                <DockIcon className="p-3 bg-primary-foreground rounded-full">
                    <Image src={"/manfromexistence/auth-dark.svg"} height={75} width={75} alt="ai" />
                </DockIcon>
            </Dock>
        </div>
    );
}
