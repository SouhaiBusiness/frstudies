"use client";  
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopBtn() {
    const [ isVisible, setIsVisible] = useState(false);

    // function to scroll to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    // show and hide scroll btn based on scroll position
    const handleScroll = () => {
         
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
      
    }

    // add scroll event listener when component monts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return <>
    <button className={`scrollToTop ${isVisible ? 'show' : 'hide'}`} onClick={scrollToTop}>
       <ArrowUp />
    </button>   
    </>
}