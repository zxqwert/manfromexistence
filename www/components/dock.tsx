"use client";

import React, { PropsWithChildren, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import Image from "next/image"
import { useTheme } from "next-themes"
import { ListCollapse } from "lucide-react"
import Link from "next/link"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/registry/default/ui/drawer"

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
    "max-w-[95%] lg:w-[1000px] mt-4 h-[58px] p-2 flex gap-2 rounded-2xl border bg-background",
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

export default function IOSDOCk() {

    const { theme } = useTheme()
    const projectIconsClassName = cn(theme === "light" ? "" : "invert");
    // 360:7,sm:12,md:14,lg:20,xl:23

    return (
        <div className="fixed bottom-4 left-0 z-50 flex items-center justify-center w-full !pb-100">
            <Dock magnification={65} distance={113}>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden md:block">
                    <Link target="_blank" href="https://ai.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/ai.svg" height={75} width={75} alt="ai" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden sm:block">
                    <Link target="_blank" href="https://algorithm.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/algorithm.svg" height={75} width={75} alt="algorithm" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full">
                    <Link target="_blank" href="https://auth.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/auth.svg" height={75} width={75} alt="auth" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden sm:block">
                    <Link target="_blank" href="https://backend.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/backend.svg" height={75} width={75} alt="backend" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden sm:block">
                    <Link target="_blank" href="https://blockchain.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/blockchain.svg" height={75} width={75} alt="blockchain" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden lg:block">
                    <Link target="_blank" href="https://deployment.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/deployment.svg" height={75} width={75} alt="deployment" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden md:block">
                    <Link target="_blank" href="https://design-pattern.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/design-pattern.svg" height={75} width={75} alt="design-pattern" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden lg:block">
                    <Link target="_blank" href="https://documentation.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/documentation.svg" height={75} width={75} alt="documentation" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden sm:block">
                    <Link target="_blank" href="https://frontend.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/frontend.svg" height={75} width={75} alt="frontend" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full">
                    <Link target="_blank" href="https://media.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/media.svg" height={75} width={75} alt="media" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden sm:block">
                    <Link target="_blank" href="https://package.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/package.svg" height={75} width={75} alt="package" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden lg:block">
                    <Link target="_blank" href="https://payment.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/payment.svg" height={75} width={75} alt="payment" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden lg:block">
                    <Link target="_blank" href="https://privacy.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/privacy.svg" height={75} width={75} alt="privacy" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden sm:block">
                    <Link target="_blank" href="https://test.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/test.svg" height={75} width={75} alt="test" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden lg:block">
                    <Link target="_blank" href="https://theory.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/theory.svg" height={75} width={75} alt="theory" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full">
                    <Link target="_blank" href="https://ui.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/ui.svg" height={75} width={75} alt="ui" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full">
                    <Link target="_blank" href="https://ux.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/ux.svg" height={75} width={75} alt="ux" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden lg:block">
                    <Link target="_blank" href="https://workspace.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/workspace.svg" height={75} width={75} alt="workspace" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden lg:block">
                    <Link target="_blank" href="https://tool.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/tool.svg" height={75} width={75} alt="tool" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden lg:block">
                    <Link target="_blank" href="https://benchmark.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/benchmark.svg" height={75} width={75} alt="benchmark" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full hidden lg:block">
                    <Link target="_blank" href="https://observerability.manfromexistence.com">
                        <Image className={projectIconsClassName} src="/manfromexistence/observerability.svg" height={75} width={75} alt="observerability" />
                    </Link>
                </DockIcon>
                <DockIcon className="p-3 dark:bg-primary-foreground bg-secondary rounded-full lg:hidden">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <ListCollapse className="h-4 w-4" />
                        </DrawerTrigger>
                        <DrawerContent >
                            <Link className="flex flex-col bg-primary-foreground space-y-2 p-2" target="_blank" href="https://observerability.manfromexistence.com">
                                <h2>Ai</h2>
                                <span className="text-muted-foreground">Copy & Past some ai related code</span>
                            </Link>
                        </DrawerContent>
                    </Drawer>
                </DockIcon>
            </Dock>
        </div>
    );
}
