"use client";  

import { useEffect, ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AosProps {
  children: ReactNode;
}

export default function Aos({ children }: AosProps) {
    useEffect(() => {
        AOS.init({
            //Global settings for aos animation
            duration: 1000, // animation duration 1s
            offset: 200,  // offset (in px) from the original trigger point
            easing: 'ease',
            once: true, // whether animation should happen only once - while scrolling
        });
    }, []);

    return <div>{children}</div>
}