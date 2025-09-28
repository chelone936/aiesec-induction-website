"use client"
import { useState, useRef } from "react"
import type React from "react"
import { Upload, X, Download, Check } from "lucide-react"
import * as htmlToImage from "html-to-image"
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    image: null as File | null,
  })
  const [showPopup, setShowPopup] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const templateRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateConfirmationImage = async () => {
    if (!templateRef.current) return
    // Wait a tick to ensure DOM updates
    await new Promise((res) => setTimeout(res, 100))
    const dataUrl = await htmlToImage.toPng(templateRef.current, {
      cacheBust: true,
      width: 1080,
      height: 1080,
      style: {
        width: "1080px",
        height: "1080px",
        transform: "none",
        fontFamily: "Inter, system-ui, sans-serif",
      },
      pixelRatio: 1,
    })
    setGeneratedImage(dataUrl)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.occupation && formData.image) {
      await generateConfirmationImage()
      setShowPopup(true)
    }
  }

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement("a")
      link.download = `aiesec-ysf-2025-${formData.name.replace(/\s+/g, "-").toLowerCase()}.png`
      link.href = generatedImage
      link.click()
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }))
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // --- Hidden template component ---
  const ConfirmationTemplate = (
    <div
      ref={templateRef}
      style={{
        width: 1080,
        height: 1080,
        margin: 0,
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        background:
          "radial-gradient(1200px 800px at 10% 10%, rgba(17,115,212,0.25), transparent 30%)," +
          "radial-gradient(1200px 800px at 90% 90%, rgb(164, 198, 232), transparent 30%)," +
          "linear-gradient(160deg, #1173d4, #1173d4)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(80% 80% at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 80%)",
          pointerEvents: "none",
        }}
      />
      {/* profile photo */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "6px solid #fff",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          background: "#eee",
        }}
      >
        <img
          src={imagePreview || "https://via.placeholder.com/220"}
          alt="User profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 450,
          left: 80,
          right: 80,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 88,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1.05,
            textTransform: "uppercase",
            color: "transparent",
            WebkitTextStroke: "3px #fff",
            textStroke: "3px #fff",
            letterSpacing: 2,
          }}
        >
          I’m Attending
        </h1>
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            margin: "20px 0 0",
            color: "#fff",
            letterSpacing: 1,
          }}
        >
          AIESEC YSF 2025 • Addis Ababa
        </h2>
        <div
          style={{
            fontSize: 24,
            marginTop: 12,
            fontWeight: 600,
            color: "#ff7a18",
          }}
        >
          See you there!
        </div>
      </div>
      {/* wave divider */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 100,
          height: 260,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path
            d="
              M0,40
              C66.66,25 133.33,25 200,40
              C266.66,55 333.33,55 400,40
              C466.66,25 533.33,25 600,40
              C666.66,55 733.33,55 800,40
              C866.66,25 933.33,25 1000,40
              C1066.66,55 1133.33,55 1200,40
              L1200,80
              L0,80
              Z
            "
            fill="#fff"
            stroke="none"
          />
        </svg>
      </div>
      {/* bottom section */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 100,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 20,
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <img
            src="/coca-cola.png"
            alt="Coca-Cola"
            style={{ height: 100, objectFit: "contain" }}
          />
          <img
            src="/ethio-telecom.png"
            alt="Ethio Telecom"
            style={{ height: 48, objectFit: "contain" }}
          />
          <img
            src="/alx.jpg"
            alt="ALX"
            style={{ height: 48, objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          October 15–17 • ysfethiopia.org
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 hidden sm:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2400 480"
          width="100%"
          height="100%"
          className="w-full h-full opacity-10"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: "scaleX(1.2) scaleY(1.2) rotate(-15deg)",
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
            strokeWidth="200"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-transparent">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" className="h-6 sm:h-8" alt="AIESEC YSF" />
          <span className="text-black text-lg sm:text-xl font-bold">AIESEC YSF</span>
        </div>
        <a href="/" className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base">
          ← Back to Home
        </a>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">Register for</h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-4 sm:mb-6">
              AIESEC YSF 2025
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
              Join Ethiopia's premier youth leadership forum. Fill out the form below to secure your spot at this
              transformative three-day event.
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-[#f1f0f0ff] rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-base sm:text-lg font-bold text-[#414040ff] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-base sm:text-lg font-bold text-[#414040ff] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Occupation Field */}
              <div>
                <label htmlFor="occupation" className="block text-base sm:text-lg font-bold text-[#414040ff] mb-2">
                  Occupation *
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  placeholder="e.g., Student, Entrepreneur, Software Developer"
                />
              </div>

              {/* Image Upload Field */}
              <div>
                <label className="block text-base sm:text-lg font-bold text-[#414040ff] mb-2">Profile Photo *</label>

                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-400 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm sm:text-base text-gray-600 mb-1">Click to upload your photo</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-full max-w-xs mx-auto">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-32 sm:h-40 object-cover rounded-xl border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-center text-xs text-gray-600 mt-1">Click to change photo</p>
                    <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 cursor-pointer" />
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.occupation || !formData.image}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                >
                  Register Now →
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-1">Registration Successful!</h3>
              <p className="text-gray-600 text-sm">Your confirmation image is ready to download.</p>
            </div>

            {generatedImage && (
              <div className="mb-3 flex justify-center">
                <div
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "192px",
                    maxHeight: "192px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: "0.75rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                    background: "#f9fafb",
                  }}
                >
                  <img
                    src={generatedImage || "/placeholder.svg"}
                    alt="Confirmation"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "192px",
                      maxHeight: "192px",
                      objectFit: "contain",
                      borderRadius: "0.75rem",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mb-3">
              <div className="text-center mb-1 font-semibold text-gray-700 text-sm">Share on social media</div>
              <div className="flex justify-center gap-2">
                <LinkedinShareButton url={window.location.origin}>
                  <LinkedinIcon size={36} round />
                </LinkedinShareButton>
                <FacebookShareButton url={window.location.origin}>
                  <FacebookIcon size={36} round />
                </FacebookShareButton>
                <WhatsappShareButton
                  url={window.location.origin}
                  title="I'm attending AIESEC YSF 2025! Join me:"
                  separator=" "
                >
                  <WhatsappIcon size={36} round />
                </WhatsappShareButton>
                <TwitterShareButton
                  url={window.location.origin}
                  title="I'm attending AIESEC YSF 2025! Join me:"
                >
                  <TwitterIcon size={36} round />
                </TwitterShareButton>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={downloadImage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden template for html-to-image */}
      <div style={{ position: "absolute", left: -9999, top: 0, zIndex: -9999 }}>
        {ConfirmationTemplate}
      </div>
    </div>
  )
}
