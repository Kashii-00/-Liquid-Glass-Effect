"use client"

import { Geist } from "next/font/google"
import { useState, useRef } from "react"
import LiquidGlass from "liquid-glass-react"
import { LogOutIcon } from "lucide-react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export default function Home() {
  // Fixed parameter values as specified
  const displacementScale = 150
  const blurAmount = 0.1
  const saturation = 100
  const aberrationIntensity = 0
  const elasticity = 0
  const cornerRadius = 52
  const overLight = true
  const mode = "standard" as const

  const containerRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState(0)
  const [textColorClass, setTextColorClass] = useState("text-white")
  const [subTextColorClass, setSubTextColorClass] = useState("text-white/80")

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      const target = event?.target as HTMLDivElement
      const scrollTop = target?.scrollTop || 0
      setScroll(scrollTop)
      
      // Determine text color based on scroll position
      // Adjust these ranges based on your actual background images
      const viewportHeight = window.innerHeight
      
      // Check if we're in a light background section
      // You can fine-tune these values based on where your light images are
      const isOnLightBackground = 
        (scrollTop > viewportHeight * 0.8 && scrollTop < viewportHeight * 1.2) || // Between first and second image
        (scrollTop > viewportHeight * 2.8 && scrollTop < viewportHeight * 3.2);   // Between third and fourth image
      
      if (isOnLightBackground) {
        setTextColorClass("text-gray-900")
        setSubTextColorClass("text-gray-700")
      } else {
        setTextColorClass("text-white")
        setSubTextColorClass("text-white/80")
      }
    })
  }

  const scrollingOverBrightSection = scroll > 230 && scroll < 500

  return (
    <div className={`${geistSans.className} w-full h-screen overflow-hidden font-[family-name:var(--font-geist-sans)]`}>
      {/* Full Width Panel - Glass Effect Demo */}
      <div className="w-full relative overflow-auto h-full" ref={containerRef} onScroll={handleScroll}>
        <div className="w-full min-h-[300vh]">
          {/* First background image - full viewport height */}
          <img src="https://picsum.photos/2560/1440" className="w-full h-screen object-cover" />
          
          {/* Content section with background */}

          
          {/* Additional background images - full viewport height */}
          <img src="https://picsum.photos/2560/1440?random=2" className="w-full h-screen object-cover" />
          <img src="https://picsum.photos/2560/1440?random=3" className="w-full h-screen object-cover" />
          <img src="https://picsum.photos/2560/1440?random=4" className="w-full h-screen object-cover" />
        </div>

        {/* User Info Card with Auto-Contrast Text */}
        <LiquidGlass
          displacementScale={displacementScale}
          blurAmount={blurAmount}
          saturation={saturation}
          aberrationIntensity={aberrationIntensity}
          elasticity={elasticity}
          cornerRadius={cornerRadius}
          mouseContainer={containerRef}
          overLight={scrollingOverBrightSection || overLight}
          mode={mode}
          style={{
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-72 text-shadow-lg">
            <h3 className={`text-xl font-semibold mb-4 transition-colors duration-500 ${textColorClass}`}>User Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 backdrop-blur rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
                  textColorClass === "text-white" ? "bg-white/20 text-white" : "bg-gray-900/20 text-gray-900"
                }`}>JD</div>
                <div>
                  <p className={`font-medium transition-colors duration-500 ${textColorClass}`}>Kashika Hettihea</p>
                  <p className={`text-sm transition-colors duration-500 ${subTextColorClass}`}>Software Engineer</p>
                </div>
              </div>
              <div className="pt-2 space-y-2">
                <div className="flex justify-between">
                  <span className={`text-sm transition-colors duration-500 ${subTextColorClass}`}>Email:</span>
                  <span className={`text-sm transition-colors duration-500 ${textColorClass}`}>kashikabanu@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm transition-colors duration-500 ${subTextColorClass}`}>Location:</span>
                  <span className={`text-sm transition-colors duration-500 ${textColorClass}`}>Colombo, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm transition-colors duration-500 ${subTextColorClass}`}>Joined:</span>
                  <span className={`text-sm transition-colors duration-500 ${textColorClass}`}>March 2025</span>
                </div>
              </div>
            </div>
          </div>
        </LiquidGlass>

        {/* Log Out Button */}
        <LiquidGlass
          displacementScale={200}
          blurAmount={blurAmount}
          saturation={saturation}
          aberrationIntensity={aberrationIntensity}
          elasticity={elasticity}
          cornerRadius={cornerRadius}
          mouseContainer={containerRef}
          overLight={scrollingOverBrightSection || overLight}
          mode={mode}
          padding="8px 16px"
          onClick={() => {
            console.log("Logged out")
          }}
          style={{
            position: "fixed",
            top: "60%",
            left: "50%",
          }}
        >
          <h3 className={`text-lg font-medium flex items-center gap-2 transition-colors duration-500 ${textColorClass}`}>
            Log Out
            <LogOutIcon className={`w-5 h-5 transition-colors duration-500 ${textColorClass}`} />
          </h3>
        </LiquidGlass>
      </div>
    </div>
  )
}
