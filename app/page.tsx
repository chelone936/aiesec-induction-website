"use client"
import { CalendarDays, UserCheck, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [activeSessionTab, setActiveSessionTab] = useState("talks")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  // Add these states and array at the top of your component
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const animatedTexts = ["LEADERS", "ENTREPRENEURS", "STUDENTS", "INNOVATORS", "CHANGEMAKERS"]
  const stats = [
    { label: "Attendees", value: 1600 },
    { label: "Speakers", value: 60, suffix: "+" },
    { label: "Partners", value: 50, suffix: "+" },
    { label: "Stages", value: 3 },
    { label: "Edition", value: 7, prefix: "", suffix: "th" },
  ]

  // Animation state for stats
  const [statsInView, setStatsInView] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const statsSectionRef = useRef<HTMLDivElement>(null)
  const [activeScheduleTab, setActiveScheduleTab] = useState("day1")

  const scheduleDays = {
    day1: [
      {
        time: "09:00 - 10:00",
        title: "Opening Ceremony & Keynote",
        description: "Kick off the forum with inspiring words from AIESEC leaders and a keynote on youth empowerment.",
        location: "Main Hall",
        isNew: false,
      },
      {
        time: "10:15 - 11:30",
        title: "Panel: The Future of Leadership",
        description: "Industry leaders discuss the evolving landscape of leadership in Ethiopia and beyond.",
        location: "Main Hall",
        isNew: true,
      },
      {
        time: "11:45 - 13:00",
        title: "Workshop: Personal Branding",
        description: "Interactive session on building your personal brand for career and impact.",
        location: "Workshop Room 1",
        isNew: false,
      },
      {
        time: "14:00 - 15:30",
        title: "Networking Circles",
        description: "Meet fellow attendees and speakers in themed networking groups.",
        location: "Networking Lounge",
        isNew: false,
      },
    ],
    day2: [
      {
        time: "09:00 - 10:30",
        title: "Fireside Chat: Entrepreneurship in Africa",
        description: "Young founders share their journeys and answer your questions.",
        location: "Main Hall",
        isNew: false,
      },
      {
        time: "10:45 - 12:00",
        title: "Workshop: Innovation Sprint",
        description: "Hands-on group activity to solve real-world challenges.",
        location: "Workshop Room 2",
        isNew: true,
      },
      {
        time: "13:00 - 14:00",
        title: "Lunch & Partner Expo",
        description: "Enjoy lunch and connect with our partners at their booths.",
        location: "Expo Area",
        isNew: false,
      },
      {
        time: "14:15 - 15:30",
        title: "Panel: Women in Leadership",
        description: "Trailblazing women share their stories and advice.",
        location: "Main Hall",
        isNew: false,
      },
    ],
    day3: [
      {
        time: "09:00 - 10:00",
        title: "Morning Energizer & Recap",
        description: "Get energized and recap highlights from previous days.",
        location: "Main Hall",
        isNew: false,
      },
      {
        time: "10:15 - 11:30",
        title: "Workshop: Social Impact Project Lab",
        description: "Develop and pitch your own social impact project ideas.",
        location: "Workshop Room 3",
        isNew: true,
      },
      {
        time: "11:45 - 13:00",
        title: "Mentorship Circles",
        description: "Small group mentoring with industry experts.",
        location: "Mentorship Lounge",
        isNew: false,
      },
      {
        time: "14:00 - 15:00",
        title: "Closing Ceremony & Awards",
        description: "Celebrate achievements and close out the forum.",
        location: "Main Hall",
        isNew: false,
      },
    ],
  }

  useEffect(() => {
    // Intersection Observer for stats section
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsInView(true)
        }
      },
      { threshold: 0.5 },
    )
    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!statsInView) return
    // Animate each stat
    stats.forEach((stat, i) => {
      const start = 0
      const end = stat.value
      const duration = 1200 // ms
      const stepTime = Math.max(Math.floor(duration / end), 15)
      let current = 0
      const step = () => {
        current += Math.ceil(end / (duration / stepTime))
        if (current > end) current = end
        setAnimatedStats((prev) => {
          const copy = [...prev]
          copy[i] = current
          return copy
        })
        if (current < end) {
          setTimeout(step, stepTime)
        }
      }
      step()
    })
  }, [statsInView])
  const faqData = [
    {
      question: "What is AIESEC YSF and who can attend?",
      answer:
        "AIESEC YSF (Youth Skills Forum) is Ethiopia's premier youth leadership forum designed for university students, young entrepreneurs, recent graduates, and emerging leaders aged 18-30. The event focuses on developing leadership skills, networking, and creating positive change in Ethiopia and beyond.",
    },
    {
      question: "When and where is the event taking place?",
      answer:
        "The forum will take place on October 15-17, 2025, in Addis Ababa, Ethiopia. The event will be held in a hybrid format, allowing both in-person and virtual participation. Detailed venue information will be shared with registered participants.",
    },
    {
      question: "What does the registration fee include?",
      answer:
        "Your registration includes access to all keynote sessions, workshops, networking events, lunch and refreshments, event materials, certificate of participation, and exclusive access to our networking platform. Virtual participants receive digital access to all sessions and materials.",
    },
    {
      question: "How do I register and what are the payment options?",
      answer:
        "Registration is available through our website. We accept various payment methods including bank transfers, mobile money, and online payments. Early bird discounts are available until November 15, 2025. Group discounts are also available for organizations registering 5 or more participants.",
    },
    {
      question: "Will sessions be recorded for virtual participants?",
      answer:
        "Yes, all main sessions will be recorded and made available to registered participants for 30 days after the event. However, interactive workshops and networking sessions are designed for live participation to maximize engagement and learning.",
    },
    {
      question: "What should I bring to the event?",
      answer:
        "Bring your laptop or tablet for interactive sessions, business cards for networking, a notebook for taking notes, and comfortable clothing for the three-day event. We'll provide all necessary materials, but personal devices will enhance your experience.",
    },
    {
      question: "Are there accommodation recommendations?",
      answer:
        "We have partnered with several hotels near the venue to offer special rates for YSF participants. A list of recommended accommodations with booking codes will be sent to registered participants. We can also assist with local transportation arrangements.",
    },
    {
      question: "Can I get a certificate of participation?",
      answer:
        "Yes, all participants who attend at least 80% of the sessions will receive a digital certificate of participation from AIESEC Ethiopia. This certificate can be used for professional development records and LinkedIn profiles.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }
  const testimonials = [
    {
      quote:
        "Participating in AIESEC YSF was the most transformative experience I've had. The connections I made and insights I gained continue to shape my leadership journey.",
      name: "Hanan Tadesse",
      role: "AIESEC YSF 2023 Participant",
    },
    {
      quote:
        "AIESEC YSF 2024 is going to be incredible. I look forward to seeing all the young leaders there, but they better bring their best ideas because the competition for impact is fierce!",
      name: "Dawit Mekonnen",
      role: "AIESEC YSF 2023 Outstanding Leader",
    },
    {
      quote:
        "The forum opened doors I never knew existed. The speakers were world-class and the networking opportunities were unmatched.",
      name: "Sara Ahmed",
      role: "Young Entrepreneur",
    },
    {
      quote:
        "AIESEC YSF doesn't just talk about leadership - it creates leaders. The experience transformed how I approach challenges and opportunities.",
      name: "Michael Gebru",
      role: "Social Impact Leader",
    },
  ]

  const sessionFormats = {
    talks: [
      {
        title: "Keynote Speech",
        description:
          "Inspiring presentations from industry leaders addressing key challenges and opportunities. Includes motivational insights and strategic vision sharing.",
        duration: "45-minute presentation + 15-minute Q&A",
        audience: "All participants",
        isNew: false,
      },
      {
        title: "Panel Discussion",
        description:
          "Expert panels discussing current trends, challenges, and solutions. Interactive discussions with multiple perspectives on critical topics.",
        duration: "60-minute discussion + 15-minute Q&A",
        audience: "All levels",
        isNew: true,
      },
    ],
    interactive: [
      {
        title: "Workshop Session",
        description:
          "Hands-on learning experiences with practical skills development. Participants engage in activities and exercises to build competencies.",
        duration: "90-minute interactive session",
        audience: "All participants",
        isNew: false,
      },
      {
        title: "Networking Circles",
        description:
          "Structured networking sessions designed to facilitate meaningful connections. Small group discussions focused on specific themes and interests.",
        duration: "45-minute structured networking",
        audience: "All levels",
        isNew: true,
      },
    ],
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    // Set target date to October 15, 2025
    const targetDate = new Date("2025-10-15T00:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length)
    }, 3000) // Change text every 3 seconds
    return () => clearInterval(textInterval)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Image with Blue Overlay */}
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <img
          src="/conference-crowd-silhouette-dark-stage-lighting.jpg"
          alt="Conference crowd"
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-blue-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/80"></div>
      </div>

      {/* Header Navigation */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-transparent backdrop-blur-sm">
        {/* Logo */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <div className="flex items-center space-x-2 bg-transparent">
            <div className="flex items-center text-white text-lg sm:text-xl font-bold bg-transparent">
              <img src="logo.png" className="h-6 sm:h-8" alt="" />
              AIESEC YSF
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 bg-transparent px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
            <CalendarDays className="w-4 h-4 sm:w-6 sm:h-6 text-white mr-1 sm:mr-2" />
            <div className="flex flex-col bg-transparent">
              <span className="text-xs text-gray-300 font-medium bg-transparent">15-17 OCT 2025,</span>
              <span className="text-sm sm:text-base text-white font-bold tracking-wide bg-transparent">
                ADDIS ABABA
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm bg-transparent">
          <a href="#" className="text-gray-300 hover:text-white transition-colors bg-transparent">
            Speakers
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors bg-transparent">
            Become A Partner
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors bg-transparent">
            Contact Us
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors bg-transparent">
            Partner With Us
          </a>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors bg-transparent">
            Register Now
          </button>
          <button className="text-white bg-transparent">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white bg-transparent">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex items-center min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8">
              {/* Top Label */}
              <div className="mb-4 sm:mb-6">
                <span className="text-blue-400 text-xs sm:text-sm font-medium tracking-wider uppercase">
                  AIESEC YSF 2024, EMPOWERING YOUTH
                </span>
              </div>

              <div className="space-y-2 mb-6 sm:mb-8">
                {/* Outlined Text */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none">
                  <span
                    className="block text-transparent bg-clip-text"
                    style={{
                      WebkitTextStroke: "1px white",
                      textStroke: "1px white",
                    }}
                  >
                    ETHIOPIA'S
                  </span>
                  <span
                    className="block text-transparent bg-clip-text"
                    style={{
                      WebkitTextStroke: "1px white",
                      textStroke: "1px white",
                    }}
                  >
                    YOUTH HUB
                  </span>
                </h1>

                {/* Solid Text */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  FOR FUTURE
                  <br />
                  <div className="relative h-[1.2em] overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-in-out"
                      style={{
                        transform: `translateY(-${currentTextIndex * 100}%)`,
                      }}
                    >
                      {animatedTexts.map((text, index) => (
                        <div key={index} className="h-full flex items-center" style={{ height: "1.2em" }}>
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                </h2>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 mb-6 sm:mb-8">
                <div className="flex flex-col">
                  <span className="text-blue-400 font-medium">VENUE</span>
                  <span>ADDIS ABABA • HYBRID</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-400 font-medium">EDITION</span>
                  <span>7TH EDITION</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-400 font-medium">DATE</span>
                  <span>15-17TH OCTOBER</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                Register Now →
              </button>
            </div>

            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="rounded-2xl p-4 sm:p-6 backdrop-blur-md border border-white/30 shadow-2xl bg-white/10 max-w-md mx-auto lg:max-w-none">
                <div className="grid grid-cols-2 gap-0">
                  {/* Days */}
                  <div className="text-center p-2 sm:p-4 border-r border-b border-white/20">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 uppercase tracking-wide">Days</div>
                  </div>

                  {/* Hours */}
                  <div className="text-center p-2 sm:p-4 border-b border-white/20">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 uppercase tracking-wide">Hours</div>
                  </div>

                  {/* Minutes */}
                  <div className="text-center p-2 sm:p-4 border-r border-white/20">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 uppercase tracking-wide">Minutes</div>
                  </div>

                  {/* Seconds */}
                  <div className="text-center p-2 sm:p-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 uppercase tracking-wide">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sponsors Section */}
      <section className="relative z-10 bg-white backdrop-blur-sm border-t border-slate-700/50 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Sponsors Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900/95 mb-2">Sponsored by</h3>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-8 sm:space-x-16 items-center py-4">
              {/* First set of sponsors */}
              <div className="flex space-x-8 sm:space-x-16 items-center min-w-max">
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="coca-cola.png" alt="Coca Cola" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="ethio-telecom.png" alt="Ethio Telecom" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="ministry.png" alt="Ministry of Women" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="alx.jpg" alt="ALX" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="coca-cola.png" alt="Coca Cola" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="ethio-telecom.png" alt="Ethio Telecom" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="ministry.png" alt="Ministry of Women" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="alx.jpg" alt="ALX" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                {/* Text sponsors unchanged */}
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Microsoft</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Google</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Amazon</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Meta</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Apple</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Netflix</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Tesla</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Spotify</span>
                </div>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-8 sm:space-x-16 items-center min-w-max">
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="coca-cola.png" alt="Coca Cola" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="ethio-telecom.png" alt="Ethio Telecom" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="ministry.png" alt="Ministry of Women" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <img src="alx.jpg" alt="ALX" className="h-16 sm:h-24 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Microsoft</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Google</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Amazon</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Meta</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Apple</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Netflix</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Tesla</span>
                </div>
                <div className="flex items-center justify-center h-20 sm:h-28 w-32 sm:w-44">
                  <span className="text-black font-bold text-xl sm:text-2xl">Spotify</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is AIESEC YSF and Why Participate Section */}
      <section className="relative z-10 bg-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-orange-200 hidden sm:block">
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="absolute top-80 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="absolute bottom-80 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>

              {/* Content with Left Margin */}
              <div className="sm:ml-12">
                {/* What Is Section */}
                <div className="mb-12 sm:mb-20">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">WHAT IS</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-4 sm:mb-6">
                      #AIESECYSF
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider mb-4 sm:mb-6">
                      WELCOME TO ETHIOPIA'S PREMIER YOUTH LEADERSHIP FORUM
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      AIESEC YSF is a transformative three-day youth leadership forum designed to empower Ethiopia's
                      next generation of leaders and connect them with global opportunities.
                    </p>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      Taking inspiration from international leadership summits, AIESEC YSF blends inspiring keynote
                      sessions with interactive workshops that challenge participants to develop their leadership
                      potential and create meaningful impact in their communities.
                    </p>
                  </div>

                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center space-x-2">
                    <span><a href="/register">Join Us</a></span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                {/* Why Participate Section */}
                <div className="mb-12 sm:mb-20">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">WHY</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-4 sm:mb-6">
                      PARTICIPATE
                    </h3>
                    <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">NETWORK. LEARN. LEAD.</p>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      Participating in AIESEC YSF will elevate your leadership journey and connect you with Ethiopia's
                      most ambitious young leaders. Thanks to our incredible speakers and partners, this forum offers
                      unparalleled networking opportunities and the chance to be part of a movement that's shaping
                      Ethiopia's future.
                    </p>
                  </div>

                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center space-x-2">
                    <span><a href="/register">Network With Experts</a></span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                <div>
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">WHO SHOULD</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-4 sm:mb-6">ATTEND</h3>
                    <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                      STUDENTS. ENTREPRENEURS. CHANGEMAKERS.
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      AIESEC YSF is designed for ambitious university students, young entrepreneurs, recent graduates,
                      and emerging leaders who are passionate about creating positive change in Ethiopia and beyond.
                    </p>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      Whether you're looking to develop your leadership skills, expand your professional network,
                      explore entrepreneurial opportunities, or gain insights from industry experts, this forum provides
                      the perfect platform to accelerate your personal and professional growth.
                    </p>
                  </div>

                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center space-x-2">
                    <span><a href="/register">Start your journey</a></span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="relative">
                {/* Circular Badge */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-blue-600 rounded-full flex items-center justify-center relative overflow-hidden">
                  {/* Center Logo */}
                  <div className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">A</div>

                  {/* Circular Text */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      <defs>
                        <path id="circle" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                      </defs>
                      <text className="text-xs fill-white font-medium tracking-wider">
                        <textPath href="#circle" startOffset="0%">
                          AIESEC YSF 2024 • YOUTH LEADERSHIP FORUM • ADDIS ABABA •
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Speakers Section */}
      <section className="relative z-10 bg-white py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2400 480"
            width="100%"
            height="100%"
            className="w-full h-full"
            aria-label="Extra thick high amplitude wave line"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: "scaleX(1.2) scaleY(1.2) rotate(-25deg)",
              transformOrigin: "center center",
            }}
          >
            <path
              d="
                M-400 240
                C-200 0, 0 480, 200 240
                C400 0, 600 480, 800 240
                C1000 0, 1200 480, 1400 240
                C1600 0, 1800 480, 2000 240
                C2200 0, 2400 480, 2600 240
                C2800 0, 3000 480, 3200 240
              "
              stroke="hsl(210,85%,45%)"
              strokeWidth="300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-left mb-6 sm:mb-8 max-w-4xl">
            <div className="bg-white  p-4 sm:p-8 inline-block">
              <p className="text-xs sm:text-sm font-bold text-[#414040ff] uppercase tracking-wider mb-2 sm:mb-4">
                EXCLUSIVELY EXPERIENCED SPEAKERS FROM DIVERSE INDUSTRIES
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#414040ff] leading-tight">
                Learn their stories
                <br />
                and get inspired
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Speaker 1 */}
            <div className="group cursor-pointer bg-[#f1f0f0ff] rounded-2xl transition-colors duration-300">
              <div className="relative mb-6">
                {/* Speaker Image with SVG Curved Bottom Border */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="/avatar-1.png"
                    alt="Sarah Johnson"
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 80"
                      className="w-full h-6 sm:h-8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 40
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    L 320 40
                    L 320 80
                    L 0 80
                    Z"
                        fill="#f1f0f0ff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                {/* Blue Badge */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="bg-[#f1f0f0ff] text-[#414040ff] p-4 sm:p-6 rounded-b-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Sarah Johnson</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">CEO & FOUNDER AT INNOHUB</p>
                {/* Company Logo */}
                <div className="flex items-center">
                  <div className="bg-transparent rounded px-2 sm:px-3 py-1 flex items-center">
                    <img src="/innohub.png" alt="InnoHub" className="h-8 sm:h-10 w-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker 2 */}
            <div className="group cursor-pointer bg-[#f1f0f0ff] rounded-2xl transition-colors duration-300">
              <div className="relative mb-6">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="/professional-business-woman-executive.jpg"
                    alt="Michael Chen"
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 80"
                      className="w-full h-6 sm:h-8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 40
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    L 320 40
                    L 320 80
                    L 0 80
                    Z"
                        fill="#f1f0f0ff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="bg-[#f1f0f0ff] text-[#414040ff] p-4 sm:p-6 rounded-b-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Michael Chen</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                  CHIEF INNOVATION OFFICER AT BLUEMOON
                </p>
                <div className="flex items-center">
                  <div className="bg-transparent rounded px-2 sm:px-3 py-1 flex items-center">
                    <img src="/bluemoon.png" alt="BlueMoon" className="h-6 sm:h-8 w-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker 3 */}
            <div className="group cursor-pointer bg-[#f1f0f0ff] rounded-2xl transition-colors duration-300">
              <div className="relative mb-6">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="/professional-business-leader-entrepreneur.jpg"
                    alt="Dr. Amara Okafor"
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 80"
                      className="w-full h-6 sm:h-8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 40
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    L 320 40
                    L 320 80
                    L 0 80
                    Z"
                        fill="#f1f0f0ff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="bg-[#f1f0f0ff] text-[#414040ff] p-4 sm:p-6 rounded-b-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Dr. Amara Okafor</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                  DIRECTOR OF SUSTAINABLE DEVELOPMENT AT DANGOTE
                </p>
                <div className="flex items-center">
                  <div className="bg-transparent px-2 sm:px-3 py-1 flex items-center">
                    <img src="/dangote.png" alt="Dangote" className="h-6 sm:h-8 w-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker 4 */}
            <div className="group cursor-pointer bg-[#f1f0f0ff] rounded-2xl transition-colors duration-300">
              <div className="relative mb-6">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="/professional-business-executive-leader.jpg"
                    alt="James Rodriguez"
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 80"
                      className="w-full h-6 sm:h-8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 40
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    L 320 40
                    L 320 80
                    L 0 80
                    Z"
                        fill="#f1f0f0ff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="bg-[#f1f0f0ff] text-[#414040ff] p-4 sm:p-6 rounded-b-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">James Rodriguez</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                  VP OF DIGITAL TRANSFORMATION AT HIBRET BANK
                </p>
                <div className="flex items-center">
                  <div className="bg-transparent rounded px-2 sm:px-3 py-1 flex items-center">
                    <img src="/hibretbank.png" alt="Hibret Bank" className="h-6 sm:h-8 w-auto" />
                  </div>
                </div>
              </div>
            </div>
            {/* Speaker 1 */}
            <div className="group cursor-pointer bg-[#f1f0f0ff] rounded-2xl transition-colors duration-300">
              <div className="relative mb-6">
                {/* Speaker Image with SVG Curved Bottom Border */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="/avatar-1.png"
                    alt="Sarah Johnson"
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 80"
                      className="w-full h-6 sm:h-8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 40
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    L 320 40
                    L 320 80
                    L 0 80
                    Z"
                        fill="#f1f0f0ff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                {/* Blue Badge */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="bg-[#f1f0f0ff] text-[#414040ff] p-4 sm:p-6 rounded-b-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Sarah Johnson</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">CEO & FOUNDER AT INNOHUB</p>
                {/* Company Logo */}
                <div className="flex items-center">
                  <div className="bg-transparent rounded px-2 sm:px-3 py-1 flex items-center">
                    <img src="/innohub.png" alt="InnoHub" className="h-8 sm:h-10 w-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker 2 */}
            <div className="group cursor-pointer bg-[#f1f0f0ff] rounded-2xl transition-colors duration-300">
              <div className="relative mb-6">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="/professional-business-woman-executive.jpg"
                    alt="Michael Chen"
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 80"
                      className="w-full h-6 sm:h-8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 40
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    L 320 40
                    L 320 80
                    L 0 80
                    Z"
                        fill="#f1f0f0ff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="bg-[#f1f0f0ff] text-[#414040ff] p-4 sm:p-6 rounded-b-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Michael Chen</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                  CHIEF INNOVATION OFFICER AT BLUEMOON
                </p>
                <div className="flex items-center">
                  <div className="bg-transparent rounded px-2 sm:px-3 py-1 flex items-center">
                    <img src="/bluemoon.png" alt="BlueMoon" className="h-6 sm:h-8 w-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker 3 */}
            <div className="group cursor-pointer bg-[#f1f0f0ff] rounded-2xl transition-colors duration-300">
              <div className="relative mb-6">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="/professional-business-leader-entrepreneur.jpg"
                    alt="Dr. Amara Okafor"
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 80"
                      className="w-full h-6 sm:h-8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 40
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    L 320 40
                    L 320 80
                    L 0 80
                    Z"
                        fill="#f1f0f0ff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="bg-[#f1f0f0ff] text-[#414040ff] p-4 sm:p-6 rounded-b-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Dr. Amara Okafor</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                  DIRECTOR OF SUSTAINABLE DEVELOPMENT AT DANGOTE
                </p>
                <div className="flex items-center">
                  <div className="bg-transparent px-2 sm:px-3 py-1 flex items-center">
                    <img src="/dangote.png" alt="Dangote" className="h-6 sm:h-8 w-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker 4 */}
            <div className="group cursor-pointer bg-[#f1f0f0ff] rounded-2xl transition-colors duration-300">
              <div className="relative mb-6">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src="/professional-business-executive-leader.jpg"
                    alt="James Rodriguez"
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 80"
                      className="w-full h-6 sm:h-8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 40
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    q 32 80 64 0
                    q 32 -80 64 0
                    L 320 40
                    L 320 80
                    L 0 80
                    Z"
                        fill="#f1f0f0ff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="bg-[#f1f0f0ff] text-[#414040ff] p-4 sm:p-6 rounded-b-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">James Rodriguez</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                  VP OF DIGITAL TRANSFORMATION AT HIBRET BANK
                </p>
                <div className="flex items-center">
                  <div className="bg-transparent rounded px-2 sm:px-3 py-1 flex items-center">
                    <img src="/hibretbank.png" alt="Hibret Bank" className="h-6 sm:h-8 w-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 bg-white py-12 sm:py-20" ref={statsSectionRef}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8 max-w-6xl mx-auto">
            {stats.map((stat, i) => (
              <div className="text-center" key={stat.label}>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 mb-2 transition-all duration-500">
                  {stat.prefix || ""}
                  {animatedStats[i]}
                  {stat.suffix || ""}
                </div>
                <div className="text-blue-400 text-sm sm:text-lg md:text-xl font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`relative z-10 py-12 sm:py-20 transition-colors duration-500 overflow-hidden ${
          activeScheduleTab === "day1" ? "bg-teal-400" : activeScheduleTab === "day2" ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 80"
            className="w-full h-12 sm:h-16"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 40
                q 60 80 120 0
                q 60 -80 120 0
                q 60 80 120 0
                q 60 -80 120 0
                q 60 80 120 0
                q 60 -80 120 0
                q 60 80 120 0
                q 60 -80 120 0
                q 60 80 120 0
                q 60 -80 120 0
                L 1200 40
                L 1200 80
                L 0 80
                Z"
              fill="white"
              stroke="none"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-6 sm:py-8">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4">Event Schedule</h2>
          </div>
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white/20 rounded-full p-2">
              <button
                onClick={() => setActiveScheduleTab("day1")}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeScheduleTab === "day1" ? "bg-white text-black shadow-lg" : "text-black hover:bg-white/10"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span>Day 1</span>
                </div>
              </button>
              <button
                onClick={() => setActiveScheduleTab("day2")}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeScheduleTab === "day2" ? "bg-black text-white shadow-lg" : "text-black hover:bg-black/10"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Day 2</span>
                </div>
              </button>
              <button
                onClick={() => setActiveScheduleTab("day3")}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeScheduleTab === "day3" ? "bg-blue-900 text-white shadow-lg" : "text-black hover:bg-blue-900/10"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span>Day 3</span>
                </div>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {scheduleDays[activeScheduleTab].map((item, index) => (
              <div key={index} className="bg-black rounded-2xl p-6 sm:p-8 text-white relative">
                {/* New Badge */}
                {item.isNew && (
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                    <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase">
                      NEW
                    </span>
                  </div>
                )}

                {/* Time & Title */}
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-2 sm:gap-4">
                  <span className="bg-white text-black font-bold px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm w-fit">
                    {item.time}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold">{item.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">{item.description}</p>

                {/* Location */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1011.314-11.314l-4.243 4.243z"
                    />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mb-2 sm:mb-4">
              GOT QUESTIONS? WE'VE GOT ANSWERS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-4 sm:mb-6">
              Frequently Asked
              <br />
              <span className="text-orange-500">Questions</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
              Find answers to the most common questions about AIESEC YSF 2025. Can't find what you're looking for?
              Contact us directly.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-4">
                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-colors duration-300">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 sm:px-8 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-black pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {openFAQ === index && (
                    <div className="px-4 sm:px-8 pb-4 sm:pb-6">
                      <div className="border-t border-gray-200 pt-4 sm:pt-6">
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-gray-600 mb-4 sm:mb-6">Still have questions? We're here to help!</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center space-x-2 mx-auto">
              <span>Contact Us</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative z-10 bg-black py-12 sm:py-20 overflow-hidden">
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 pointer-events-none select-none hidden lg:block">
          <img
            src="https://cdn.prod.website-files.com/63b2a5b42091f1283873f0fe/67991c91bdab84fd9f1827a1_where-shape.svg"
            alt="Decorative location shape"
            className="w-[400px] lg:w-[600px] h-[300px] lg:h-[400px] object-contain opacity-90"
            draggable={false}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="mb-8 sm:mb-12">
              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
                International community
              </h2>

              {/* Date and Location */}
              <div className="relative inline-block mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white relative z-10">
                  15-17 Oct, Addis Ababa
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
                <button className="bg-black border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-white hover:text-black transition-all duration-300">
                  Venue Website
                </button>
                <button className="bg-black border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-white hover:text-black transition-all duration-300">
                  Google Maps
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Exterior Image */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/addis-ababa-conference-center-exterior.jpg"
                  alt="Conference center exterior in Addis Ababa"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>

              {/* Interior Image */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/addis-ababa-conference-center-interior.jpg"
                  alt="Conference center interior hall"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative z-10 bg-black py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2400 480"
            width="100%"
            height="100%"
            className="w-full h-full"
            aria-label="Extra thick high amplitude wave line"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: "scaleX(1.2) scaleY(1.2) rotate(-8deg)",
              transformOrigin: "center center",
            }}
          >
            <path
              d="
                M-400 240
                C-200 0, 0 480, 200 240
                C400 0, 600 480, 800 240
                C1000 0, 1200 480, 1400 240
                C1600 0, 1800 480, 2000 240
                C2200 0, 2400 480, 2600 240
                C2800 0, 3000 480, 3200 240
              "
              stroke="#1173d4ff"
              strokeWidth="160"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Date and CTA Heading */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                15-17th October
              </h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                Join Us at AIESEC YSF 2025!
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8">
                Be part of Ethiopia's most exciting youth leadership event. Connect, learn, and grow with future
                leaders, entrepreneurs, and changemakers. Secure your spot and experience three days of inspiration,
                networking, and impact!
              </p>
            </div>

            {/* CTA Button */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
              <a
                href="/register"
                className="inline-block bg-white hover:text-white hover:bg-[#1173d4ff] text-[#1173d4ff] px-8 sm:px-12 py-4 sm:py-5 rounded-full text-xl sm:text-2xl font-bold transition-colors duration-300 shadow-lg hover:scale-105"
              >
                Register Now →
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-black py-0 overflow-hidden">
        <div className="w-full overflow-hidden py-6 sm:py-8 bg-black">
          <div className="animate-scroll-text whitespace-nowrap flex">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mr-8 sm:mr-16">
              YSF.COM HELLO@AIESECYSF.COM HELLO@AIESEC
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mr-8 sm:mr-16">
              YSF.COM HELLO@AIESECYSF.COM HELLO@AIESEC
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mr-8 sm:mr-16">
              YSF.COM HELLO@AIESECYSF.COM HELLO@AIESEC
            </span>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8">
              {/* AIESEC Logo */}
              <div className="mb-6 sm:mb-8">
                <img src="White-Black-Logo.png" className="h-12 sm:h-16 mb-4 sm:mb-6" alt="AIESEC YSF" />
                <p className="text-white text-base sm:text-lg mb-3 sm:mb-4">Contact us if you have any questions.</p>
                <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold">HELLO@AIESECYSF.COM</p>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {/* LinkedIn */}
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Spotify */}
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.979 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm text-gray-400 border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <a href="#" className="hover:text-white transition-colors">
                CODE OF CONDUCT
              </a>
              <a href="#" className="hover:text-white transition-colors">
                PRIVACY POLICY & INFORMATION CLAUSES
              </a>
              <a href="#" className="hover:text-white transition-colors">
                TERMS & CONDITIONS
              </a>
            </div>
            <div>© 2025 AIESEC YSF</div>
          </div>
        </div>
      </footer>

      <style jsx>{`
      
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-email {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        /* Added responsive animation speeds - faster on mobile, normal on desktop */
        
        /* Mobile: Faster animations for better UX on small screens */
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
        
        .animate-scroll-text {
          animation: scroll-text 15s linear infinite;
        }

        /* Desktop: Normal speed animations */
        @media (min-width: 768px) {
          .animate-scroll {
            animation: scroll 15s linear infinite;
          }
          
          .animate-scroll-text {
            animation: scroll-text 20s linear infinite;
          }
        }

        /* Large desktop: Even slower for better readability */
        @media (min-width: 1024px) {
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          
          .animate-scroll-text {
            animation: scroll-text 25s linear infinite;
          }
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .animate-scroll-email {
          animation: scroll-email 25s linear infinite;
        }

        @keyframes scroll-text {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        /* Added curved border effect for speaker images */
        .curved-border {
          clip-path: ellipse(100% 100% at 50% 0%);
        }
        
        .speaker-image-container {
          position: relative;
        }
        
        .speaker-image-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 32px;
          background: black;
          clip-path: ellipse(100% 100% at 50% 0%);
        }
      `}</style>
    </div>
  )
}
