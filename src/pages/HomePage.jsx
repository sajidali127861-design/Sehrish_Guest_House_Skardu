// pages/HomePage.jsx
import { useState, useEffect } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Footer from "../components/Footer.jsx";
import { IMGS } from "../assets/images.js";
import { ROOMS } from "../data/rooms.js";
import { COLORS } from "../theme/color.js";
import { WHATSAPP_NUMBER, buildBookingMessage } from "../config.js";

// ── Official WhatsApp SVG Icon ────────────────────────────────
const WhatsAppIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
      fill={color}
    />
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      fill="#25D366"
    />
  </svg>
);

// ── Section Divider (golden fade, no solid line) ──────────────
const GoldenDivider = () => (
  <div style={{
    height: 1,
    background: "linear-gradient(to right, transparent 0%, #C9922A 30%, #D9A84E 50%, #C9922A 70%, transparent 100%)",
    opacity: 0.35,
    margin: 0,
  }} />
);

// ── Hero Section ──────────────────────────────────────────────
// ── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  const [slide, setSlide] = useState(0);
  const slides = [IMGS.hero01, IMGS.hero03, IMGS.hero02];

  useEffect(() => {
    const t = setInterval(() => {
      setSlide(s => (s + 1) % slides.length);
    }, 5500);

    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "clamp(550px, 85vh, 800px)",
        overflow: "hidden",
      }}
    >
      {slides.map((src, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 65%",
            opacity: i === slide ? 1 : 0,
            transform: i === slide ? "scale(1.04)" : "scale(1)",
            transition: "opacity 1.3s ease, transform 7s ease",
          }}
        />
      ))}

      {/* Dark overlay for better text visibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.55) 100%
          )`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(32px, 6vw, 76px)",
            color: COLORS.white,
            fontWeight: 300,
            letterSpacing: 1,
            lineHeight: 1.2,
            margin: "0 0 16px",
            animation: "fadeUp 1.2s ease 0.3s both",
            textShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
        </h1>

        <p
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "clamp(20px, 3vw, 30px)",
            color: COLORS.white,
            letterSpacing: 4,
            textTransform: "uppercase",
            animation: "fadeUp 1s ease 1s both",
            textShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
          }}
        >
          A Heritage Retreat in Skardu Valley
        </p>
      </div>
    </section>
  );
}

// ── Quick Booking Bar ─────────────────────────────────────────
// ── Quick Booking Bar ─────────────────────────────────────────
function QuickBookBar() {
  return (
    <div
      style={{
        maxWidth: 1050,
        margin: "40px auto",
        position: "relative",
        zIndex: 10,
      }}
    >
      <AnimBlock>
        <div
          style={{
            background: COLORS.white,
            borderRadius: 12,
            padding: "24px 32px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {/* Check-in */}
          <div
            style={{
              flex: "1 1 200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: 13,
                color: COLORS.textSecondary,
                marginBottom: 8,
                fontWeight: 700,
                fontFamily: "Lato, sans-serif",
              }}
            >
              Check-in
            </label>

            <input
              type="date"
              style={{
                padding: "12px 16px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                color: COLORS.textPrimary,
                fontSize: 15,
                fontFamily: "Lato, sans-serif",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Check-out */}
          <div
            style={{
              flex: "1 1 200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: 13,
                color: COLORS.textSecondary,
                marginBottom: 8,
                fontWeight: 700,
                fontFamily: "Lato, sans-serif",
              }}
            >
              Check-out
            </label>

            <input
              type="date"
              style={{
                padding: "12px 16px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                color: COLORS.textPrimary,
                fontSize: 15,
                fontFamily: "Lato, sans-serif",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Guests */}
          <div
            style={{
              flex: "1 1 200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: 13,
                color: COLORS.textSecondary,
                marginBottom: 8,
                fontWeight: 700,
                fontFamily: "Lato, sans-serif",
              }}
            >
              Guests
            </label>

            <select
              style={{
                padding: "12px 16px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                color: COLORS.textPrimary,
                fontSize: 15,
                fontFamily: "Lato, sans-serif",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
                background: COLORS.white,
                cursor: "pointer",
              }}
            >
              <option>1 Guest</option>
              <option defaultValue>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>

          {/* Check Availability Button */}
          <div
            style={{
              flex: "1 1 200px",
            }}
          >
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    buildBookingMessage()
                  )}`,
                  "_blank"
                )
              }
              style={{
                width: "100%",
                padding: "13px 24px",
                background: COLORS.primary,
                color: COLORS.white,
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "Lato, sans-serif",
                cursor: "pointer",
                transition: "background 0.3s",
                height: 47,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = COLORS.primary;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = COLORS.primary;
              }}
            >
              Check Availability
            </button>
          </div>
        </div>
      </AnimBlock>
    </div>
  );
}
// ── Welcome Block ─────────────────────────────────────────────
// ── Welcome Block ─────────────────────────────────────────────
function WelcomeSection() {
  return (
    <>
      <section
        style={{
          background: COLORS.white,
          padding: "80px 32px 60px",
        }}
      >
        <div
          style={{
            maxWidth: 1050,
            margin: "0 auto",
          }}
        >
          <AnimBlock>
            <div
              style={{
                textAlign: "center",
                maxWidth: 850,
                margin: "0 auto",
              }}
            >
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(34px, 5vw, 54px)",
                  color: COLORS.textPrimary,
                  margin: "0 0 10px",
                  fontWeight: "bold",
                }}
              >
                Welcome to Sehrish Guest House Skardu
              </h2>

              <h3
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: "clamp(16px, 2.5vw, 20px)",
                  color: COLORS.primary,
                  margin: "0 0 24px",
                  fontWeight: "bold",
                }}
              >
                Experience the Serenity of the North
              </h3>

              <div
                className="gold-divider"
                style={{
                  margin: "0 auto 24px",
                }}
              />

              <p
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                Welcome our guests to Sehrish Guest House Skardu located in the
                heart of Skardu. Nestled amidst the majestic Karakoram peaks,
                our retreat offers a perfect blend of traditional Baltistani
                heritage and modern comfort. Let nature be your sanctuary.
              </p>
            </div>
          </AnimBlock>

          <QuickBookBar />

          <AnimBlock delay={0.2}>
            <div
              style={{
                overflow: "hidden",
                borderRadius: 12,
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                marginTop: 20,
              }}
            >
              <img
                src={IMGS.ext02}
                alt="Welcome to Sehrish Guest House Skardu"
                loading="lazy"
                style={{
                  width: "100%",
                  aspectRatio: "21/9",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          </AnimBlock>
        </div>
      </section>

      <GoldenDivider />
    </>
  );
}

export function FeaturedRooms({ setPage, setRoomId }) {
  const animationDirs = ["slideInLeft", "fadeUp", "slideInRight"];

  return (
    <>
      <section style={{ background: COLORS.background, padding: "clamp(60px, 8vw, 90px) 32px" }}>
        <AnimBlock>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: COLORS.gold,
                textTransform: "uppercase",
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              Accommodations
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                color: COLORS.textPrimary,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Featured Rooms & Villas
            </h2>
          </div>
        </AnimBlock>

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
            overflow: "hidden",
          }}
        >
          {ROOMS.slice(0, 3).map((room, i) => (
            <div
              key={room.id}
              style={{
                animation: `${animationDirs[i]} 0.8s ease ${i * 0.2}s both`,
              }}
            >
              <RoomCard room={room} setPage={setPage} setRoomId={setRoomId} delay={0} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button
            onClick={() => {
              setPage("rooms");
              window.scrollTo(0, 0);
            }}
            style={{
              background: "transparent",
              color: COLORS.primary,
              border: `1.5px solid ${COLORS.primary}`,
              padding: "12px 32px",
              fontFamily: "Lato, sans-serif",
              fontSize: 12,
              letterSpacing: "0.15em",
              fontWeight: 600,
              borderRadius: 30,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.primary;
              e.currentTarget.style.color = COLORS.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = COLORS.primary;
            }}
          >
            VIEW ALL ROOMS
          </button>
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

// ── Dining / Experience Highlight ─────────────────────────────
export function DiningHighlight() {
  const highlights = [
    "A beautifully crafted dining space with panoramic views of the Karakoram peaks.",
    "Floor-to-ceiling windows enhancing your dining experience with natural mountain light.",
    "Perfect for intimate meals and larger gatherings, offering traditional Balti cuisine.",
  ];

  return (
    <>
      <section
        style={{
          background: COLORS.white,
          padding: "clamp(50px, 8vw, 90px) clamp(20px, 4vw, 32px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(28px, 5vw, 60px)",
            alignItems: "center",
          }}
        >
          <AnimBlock from="left">
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: COLORS.gold,
                textTransform: "uppercase",
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              What Awaits You
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(26px, 4vw, 42px)",
                color: COLORS.textPrimary,
                margin: "0 0 24px",
                lineHeight: 1.25,
                fontWeight: 400,
              }}
            >
              Heritage Culinary Experience at Sehrish Guest House Skardu
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {highlights.map((text, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span
                    style={{
                      color: COLORS.primary,
                      fontSize: 16,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    ✦
                  </span>
                  <p
                    style={{
                      fontFamily: "Lato, sans-serif",
                      fontSize: 15,
                      color: COLORS.textSecondary,
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </AnimBlock>

          <AnimBlock from="right">
            <img
              src={IMGS.gallery02}
              alt="Heritage Restaurant"
              loading="lazy"
              style={{
                width: "100%",
                borderRadius: 12,
                boxShadow: "0 14px 34px rgba(28, 18, 9, 0.08)",
                border: `1px solid ${COLORS.lightBorder}`,
                objectFit: "cover",
                aspectRatio: "4/3",
                display: "block",
              }}
            />
          </AnimBlock>
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

// ── All-Inclusive Amenities ───────────────────────────────────
export function AmenitiesStrip() {
  const items = [
    ["📡", "COMPLIMENTARY WI-FI"],
    ["🚗", "FREE PARKING"],
    ["🍽️", "ON-SITE RESTAURANT"],
    ["🛎️", "ROOM SERVICE"],
    ["🏔️", "GUIDED TOURS"],
    ["🔥", "BONFIRE NIGHTS"],
  ];

  return (
    <>
      <section style={{ background: COLORS.background, padding: "clamp(60px, 8vw, 90px) 32px" }}>
        <AnimBlock>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: COLORS.gold,
                textTransform: "uppercase",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              Resort Facilities
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                color: COLORS.textPrimary,
                fontWeight: 400,
                margin: 0,
              }}
            >
              All-Inclusive Amenities
            </h2>
          </div>
        </AnimBlock>

        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {items.map(([icon, title], i) => (
            <AnimBlock key={title} delay={i * 0.05}>
              <div
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 10,
                  padding: "32px 16px",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(28, 18, 9, 0.03)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(28, 18, 9, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(28, 18, 9, 0.03)";
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    marginBottom: 14,
                    lineHeight: 1,
                  }}
                >
                  {icon}
                </div>
                <h4
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: COLORS.textPrimary,
                    margin: 0,
                    fontWeight: 700,
                  }}
                >
                  {title}
                </h4>
              </div>
            </AnimBlock>
          ))}
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

// ── Booking.com Style Multi-Card Carousel Grid Layout ──────────────────
export function BookingReviews() {
  const [startIndex, setStartIndex] = useState(0);

  const reviews = [
    {
      name: "Janne",
      country: "Netherlands",
      flag: "🇳🇱",
      date: "October 5, 2025",
      score: "10",
      title: "Wonderful stay in Skardu",
      positive:
        "Comfortable, spacious and clean room and a beautiful garden to sit outside. Location is great, with a couple of nice restaurants close by. Staff is super friendly and welcoming. Amazing stay!",
      avatarImg: null,
      avatarColor: "#5B7065",
      initial: "J",
      roomType: "Deluxe Twin Room",
      stayDetails: "2 nights · Couple",
    },
    {
      name: "Nathalie",
      country: "Switzerland",
      flag: "🇨🇭",
      date: "July 17, 2025",
      score: "10",
      title: "Lovely place to stay in Skardu",
      positive:
        "Friendly and helpful host who can arrange tours and transfers. Lovely garden area with a lot of shade which was really nice in the hot weather. In a quiet location, but close to some nice restaurants.",
      avatarImg: null,
      avatarColor: "#8C6D58",
      initial: "N",
      roomType: "Deluxe Twin Room",
      stayDetails: "2 nights · Couple",
    },
    {
      name: "Hashim",
      country: "United Arab Emirates",
      flag: "🇦🇪",
      date: "August 18, 2025",
      score: "10",
      title: "3 Days in Sehrish Guest House Skardu",
      positive:
        "Overall the stay was very comfortable. The rooms were huge with all the facilities required. Staff were very friendly and always available. Even the owner of the hotel himself visited us to ensure everything was perfect.",
      avatarImg: IMGS?.revHashim || null,
      avatarColor: "#614F44",
      initial: "H",
      roomType: "Executive Suite",
      stayDetails: "3 nights · Family",
    },
    {
      name: "Haseeb",
      country: "United Kingdom",
      flag: "🇬🇧",
      date: "September 27, 2025",
      score: "10",
      title: "Great location in Skardu",
      positive:
        "Attentive staff always on site to help. Large beds and very comfy. They accept card and bank transfer which made life very easy.",
      avatarImg: null,
      avatarColor: "#4A5568",
      initial: "H",
      roomType: "Executive Suite",
      stayDetails: "3 nights · Group",
    },
    {
      name: "Timothy",
      country: "Australia",
      flag: "🇦🇺",
      date: "October 11, 2025",
      score: "8.0",
      title: "Good option in peaceful courtyard",
      positive:
        "Good location. Pleasant courtyard and garden. Comfortable good sized room. Excellent bathroom.",
      avatarImg: null,
      avatarColor: "#D97706",
      initial: "T",
      roomType: "Deluxe Double Room",
      stayDetails: "1 night · Solo traveler",
    },
    {
      name: "Rene",
      country: "Netherlands",
      flag: "🇳🇱",
      date: "July 12, 2025",
      score: "9.0",
      title: "Wonderful garden atmosphere",
      positive:
        "Lovely serene garden, quiet location, and authentic hospitality in Skardu.",
      avatarImg: null,
      avatarColor: "#1E3A8A",
      initial: "R",
      roomType: "Deluxe Twin Room",
      stayDetails: "2 nights · Couple",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [startIndex]);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1 >= reviews.length ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const getDisplaySet = () => {
    let out = [];
    for (let i = 0; i < 3; i++) {
      out.push(reviews[(startIndex + i) % reviews.length]);
    }
    return out;
  };

  const bookingUrl = "https://www.booking.com/hotel/pk/sehrish-guest-house.html#tab-reviews";

  return (
    <>
      <section style={{ background: COLORS.background, padding: "clamp(60px, 8vw, 85px) 32px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>

          {/* Header Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img
                src={IMGS.hero01}
                alt="Sehrish Guest House"
                loading="lazy"
                style={{
                  width: "88px",
                  height: "62px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: `1px solid ${COLORS.lightBorder}`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                }}
              />
              <div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "28px",
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                    margin: "0 0 4px",
                  }}
                >
                  Sehrish Guest House Skardu
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "2px", color: COLORS.booking, fontSize: "14px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>
                  <span
                    style={{
                      background: COLORS.booking,
                      color: COLORS.white,
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: "4px",
                    }}
                  >
                    9.8 / 10
                  </span>
                  <p style={{ fontFamily: "Lato, sans-serif", fontSize: "13px", color: COLORS.textSecondary, margin: 0 }}>
                    Verified Booking.com Reviews
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.open(bookingUrl, "_blank")}
              style={{
                background: COLORS.white,
                border: `1.5px solid ${COLORS.textPrimary}`,
                borderRadius: "30px",
                padding: "10px 28px",
                fontFamily: "Lato, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: COLORS.textPrimary,
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.textPrimary;
                e.currentTarget.style.color = COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.white;
                e.currentTarget.style.color = COLORS.textPrimary;
              }}
            >
              Review on Booking.com
            </button>
          </div>

          {/* Carousel Slider */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", padding: "0 8px" }}>

            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              style={{
                position: "absolute",
                left: "-18px",
                zIndex: 12,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                cursor: "pointer",
                fontSize: "22px",
                color: COLORS.textPrimary,
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              ‹
            </button>

            {/* Review Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", width: "100%" }}>
              {getDisplaySet().map((rev, idx) => (
                <div
                  key={idx}
                  style={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "18px",
                    padding: "26px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "310px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.03)",
                  }}
                >
                  <div>
                    {/* Top Row: Avatar & Booking Score Box */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        {rev.avatarImg ? (
                          <img
                            src={rev.avatarImg}
                            alt={rev.name}
                            loading="lazy"
                            style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "44px",
                              height: "44px",
                              borderRadius: "50%",
                              background: rev.avatarColor,
                              color: COLORS.white,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontWeight: 700,
                              fontSize: "16px",
                              fontFamily: "Lato, sans-serif",
                            }}
                          >
                            {rev.initial}
                          </div>
                        )}
                        <div>
                          <h4 style={{ margin: 0, fontFamily: "Lato, sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.textPrimary }}>
                            {rev.name}
                          </h4>
                          <p style={{ margin: "2px 0 0", fontFamily: "Lato, sans-serif", fontSize: "12px", color: COLORS.textLight }}>
                            {rev.flag} {rev.country}
                          </p>
                        </div>
                      </div>

                      {/* Official Booking.com Score Pill */}
                      <div
                        style={{
                          background: COLORS.booking,
                          color: COLORS.white,
                          fontWeight: 700,
                          padding: "4px 9px",
                          borderRadius: "6px 6px 6px 0px",
                          fontSize: "13px",
                          fontFamily: "Lato, sans-serif",
                          boxShadow: "0 2px 6px rgba(0, 59, 149, 0.2)",
                        }}
                      >
                        {rev.score}
                      </div>
                    </div>

                    {/* Room Category & Stay Info */}
                    <div
                      style={{
                        fontSize: "11px",
                        fontFamily: "Lato, sans-serif",
                        color: COLORS.textMuted,
                        marginBottom: "12px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      <span>🛏️ {rev.roomType}</span> • <span>{rev.stayDetails}</span>
                    </div>

                    {/* Review Title */}
                    <h5
                      style={{
                        margin: "0 0 8px",
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: COLORS.textPrimary,
                        lineHeight: 1.25,
                      }}
                    >
                      "{rev.title}"
                    </h5>

                    {/* Review Body */}
                    <p
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "13.5px",
                        color: COLORS.textSecondary,
                        lineHeight: "1.6",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {rev.positive}
                    </p>
                  </div>

                  {/* Card Bottom: Date & Verified link */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "18px",
                      borderTop: `1px solid ${COLORS.lightBorder}`,
                      paddingTop: "12px",
                    }}
                  >
                    <span style={{ fontSize: "11px", fontFamily: "Lato, sans-serif", color: COLORS.textLight }}>
                      {rev.date}
                    </span>
                    <span
                      onClick={() => window.open(bookingUrl, "_blank")}
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "11px",
                        color: COLORS.primary,
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      View on Booking.com →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next review"
              style={{
                position: "absolute",
                right: "-18px",
                zIndex: 12,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                cursor: "pointer",
                fontSize: "22px",
                color: COLORS.textPrimary,
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              ›
            </button>
          </div>

        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

// ── 📍 Location Section ───────────────────────────────────────
export function LocationSection() {
  // ── Exact Google Maps URLs for Sehrish Guest House Skardu ──────────
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Sehrish+Guest+House+572+Sumbul+Town+Olding+Skardu+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed";

  const directMapUrl =
    "https://www.google.com/maps/search/?api=1&query=Sehrish+Guest+House+Skardu+Pakistan";

  return (
    <>
      <section style={{ background: COLORS.white, padding: "clamp(60px, 8vw, 90px) 32px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "36px" }}>

          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.2em",
                color: COLORS.gold,
                textTransform: "uppercase",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Explore Skardu
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                color: COLORS.textPrimary,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Our Mountain Sanctuary
            </h2>
            <div
              style={{
                width: "48px",
                height: "2px",
                background: COLORS.primary,
                margin: "14px auto 0",
              }}
            />
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "14px",
                color: COLORS.textSecondary,
                marginTop: "16px",
                marginBottom: "24px",
                lineHeight: "1.6",
              }}
            >
              📍 <strong style={{ color: COLORS.textPrimary }}> Ali Abad Khagrong Skardu</strong>
              <span style={{ display: "block", marginTop: "4px", fontSize: "13px" }}>
                Plus Code: <strong> Skardu, Gilgit-Baltistan, Pakistan</strong>

              </span>
            </p>

            <button
              onClick={() => window.open(directMapUrl, "_blank")}
              style={{
                background: COLORS.primary,
                color: COLORS.white,
                border: "none",
                borderRadius: "30px",
                padding: "12px 30px",
                fontFamily: "Lato, sans-serif",
                fontSize: "13px",
                letterSpacing: "0.08em",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 18px rgba(28, 18, 9, 0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.primaryDark;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.primary;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              🗺️ Open in Google Maps
            </button>
          </div>

          <AnimBlock>
            <div
              style={{
                overflow: "hidden",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(28, 18, 9, 0.06)",
                border: `1px solid ${COLORS.border}`,
                height: "460px",
                width: "100%",
              }}
            >
              <iframe
                title="Sehrish Guest House Skardu Accurate Location"
                src={mapEmbedUrl}
                style={{ width: "100%", height: "100%", border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimBlock>

        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

// ── WhatsApp CTA Banner ───────────────────────────────────────
export function CTABanner() {
  return (
    <section style={{ background: COLORS.background, padding: "clamp(60px, 8vw, 90px) 32px", textAlign: "center" }}>
      <AnimBlock>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            color: COLORS.textPrimary,
            fontWeight: 400,
            margin: "0 0 16px",
          }}
        >
          Ready to Reserve Your Stay?
        </h2>
        <p
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "15px",
            color: COLORS.textSecondary,
            maxWidth: 520,
            margin: "0 auto 36px",
            lineHeight: 1.8,
          }}
        >
          Let the Karakoram welcome you. Connect with our dedicated hosts on WhatsApp for instant booking, custom itineraries, and personalised hospitality.
        </p>
        <button
          onClick={() =>
            window.open(
              `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBookingMessage())}`,
              "_blank"
            )
          }
          style={{
            background: COLORS.whatsapp,
            color: COLORS.white,
            border: "none",
            padding: "14px 34px",
            borderRadius: "50px",
            fontFamily: "Lato, sans-serif",
            fontSize: "14px",
            letterSpacing: "0.06em",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 8px 24px rgba(37, 211, 102, 0.28)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(37, 211, 102, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 211, 102, 0.28)";
          }}
        >
          <WhatsAppIcon size={20} color={COLORS.white} />
          Book via WhatsApp
        </button>
      </AnimBlock>
    </section>
  );
}

// ── Main Export ───────────────────────────────────────────────
export default function HomePage({ setPage, setRoomId }) {
  return (
    <div>
      <HeroSection />
      <WelcomeSection />
      <FeaturedRooms setPage={setPage} setRoomId={setRoomId} />
      <DiningHighlight />
      <AmenitiesStrip />
      <BookingReviews />
      <LocationSection />
      <CTABanner />
      <Footer setPage={setPage} />
    </div>
  );
}