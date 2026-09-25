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
                e.currentTarget.style.background = COLORS.primaryDark;
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
                Welcome to Arish Luxury Suites
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
                Welcome our guests to Arish Luxury Suites located in the
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
                alt="Welcome to Arish Luxury Suites"
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
              Heritage Culinary Experience at Arish Luxury Suites
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
      name: "Haseeb",
      country: "United Kingdom",
      flag: "🇬🇧", // or "GB"
      date: "September 27, 2025",
      score: "10",
      title: "Great location in Skardu",
      positive:
        "Attentive staff always on site to help. Large beds and very comfy. They accept card and bank transfer which made life very easy.",
      avatarImg: null,
      avatarColor: COLORS.purple || "#6B21A8",
      initial: "H",
      roomType: "Executive Suite",
      stayDetails: "3 nights · September 2025 · Group",
    },
    {
      name: "Rahim",
      country: "United Arab Emirates",
      flag: "🇦🇪", // or "AE"
      date: "August 19, 2025",
      score: "10",
      title: "Exceptional",
      positive: "Easy access and cooperative staff.",
      negative: "Cleanness and location",
      avatarImg: null,
      avatarColor: COLORS.dark || "#4A3B32",
      initial: "R",
      roomType: "Executive Suite",
      stayDetails: "2 nights · August 2025 · Family",
    },
    {
      name: "Hashim",
      country: "United Arab Emirates",
      flag: "🇦🇪", // or "AE"
      date: "August 18, 2025",
      score: "10",
      title: "3 Days in Arish Luxury Suites",
      positive:
        "Overall the stay was very comfortable. The rooms were huge with all the facilities required. Staff were very friendly and always available. Even the owner of the hotel himself visited us and keep checking if anything required. The location is very good since it is in the city so everything was nearby.\n\nI recommend this hotel to everyone who is visiting Skardu for tourism to stay in this hotel as the hotel rooms are huge, location is very good and Afterall it is not expensive at all.",
      avatarImg: IMGS.revHashim,
      avatarColor: null,
      roomType: "Executive Suite",
      stayDetails: "3 nights · July 2025 · Family",
    },
    {
      name: "Anil",
      country: "United Kingdom",
      flag: "🇬🇧", // or "GB"
      date: "August 11, 2025",
      score: "9.0",
      title:
        "Was there with my mrs for a couple of days and we really enjoyed our stay. Both the front-office staff, special mention",
      positive:
        "Very clean and finished to a high spec. Comfortable beds and pleasent living space in the executive room, set-up in a cosy guest house. Nice complementary breakfast too.",
      avatarImg: null,
      avatarColor: COLORS.blue || "#0284C7",
      initial: "A",
      roomType: "Executive Suite",
      stayDetails: "2 nights · August 2025 · Couple",
    },
    {
      name: "Caitríona",
      country: "Ireland",
      flag: "🇮🇪", // or "IE"
      date: "August 12, 2026",
      score: "10",
      title: "Exceptional",
      positive:
        "Great accommodation! We stayed here for 3 nights during our trip to Skardu and had a very comfortable and enjoyable stay here. The staff were very welcoming and hospitable and gave us a complimentary room upgrade. The room was very spacious, the bed was very comfortable, air conditioning was very good, there was a fridge in the room also and the shower was hot and powerful. Breakfast was simple but very tasty.",
      avatarImg: IMGS.revCaitriona,
      avatarColor: null,
      roomType: "Deluxe Room",
      stayDetails: "2 nights · August 2026 · Couple",
    },
    {
      name: "Naeem",
      country: "Pakistan",
      flag: "🇵🇰", // or "PK"
      date: "June 21, 2026",
      score: "10",
      title: "Exceptional",
      positive: "Decent location and decent service.",
      avatarImg: IMGS.revNaeem,
      avatarColor: null,
      roomType: "Deluxe Room",
      stayDetails: "3 nights · June 2026 · Couple",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 5500);
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

const bookingUrl =
  "https://www.booking.com/hotel/pk/arish-luxury-suites.html#tab-reviews";
  return (
    <>
      <section style={{ background: COLORS.background, padding: "clamp(60px, 8vw, 80px) 32px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
          
          {/* Header Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img
                src={IMGS.hero02}
                alt="Resort Thumbnail"
                loading="lazy"
                style={{
                  width: "90px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: `1px solid ${COLORS.lightBorder}`,
                  boxShadow: "0 4px 12px rgba(28, 18, 9, 0.05)",
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
                  Arish Luxury Suites
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "2px", color: COLORS.booking, fontSize: "13px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "Lato, sans-serif", fontSize: "14px", color: COLORS.textSecondary, margin: 0 }}>
                    Verified Guest Reviews
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
                letterSpacing: "0.08em",
                color: COLORS.textPrimary,
                cursor: "pointer",
                transition: "all 0.25s ease-in-out",
                boxShadow: "0 2px 6px rgba(28, 18, 9, 0.03)",
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
              Write a Review
            </button>
          </div>

          {/* Carousel Slider */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", padding: "0 10px" }}>
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
                boxShadow: "0 4px 14px rgba(28, 18, 9, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              ‹
            </button>

            {/* Review Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", width: "100%" }}>
              {getDisplaySet().map((rev, idx) => (
                <div
                  key={idx}
                  style={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "18px",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "280px",
                    boxShadow: "0 6px 20px rgba(28, 18, 9, 0.03)",
                    position: "relative",
                  }}
                >
                  <div>
                    {/* Top Row: Avatar & Booking Badge */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                        {rev.avatarImg ? (
                          <img
                            src={rev.avatarImg}
                            alt={rev.name}
                            loading="lazy"
                            style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "46px",
                              height: "46px",
                              borderRadius: "50%",
                              background: rev.avatarColor || COLORS.primary,
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
                            {rev.flag} {rev.country} • <span style={{ color: COLORS.textMuted }}>{rev.date}</span>
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          background: COLORS.booking,
                          color: COLORS.white,
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontFamily: "Lato, sans-serif",
                        }}
                      >
                        B.
                      </div>
                    </div>

                    {/* Star Rating & Verified Label */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "16px 0 12px" }}>
                      <div style={{ display: "flex", gap: "1px", color: COLORS.booking, fontSize: "12px" }}>
                        {[1, 2, 3, 4, 5].map((item) => (
                          <span key={item}>★</span>
                        ))}
                      </div>
                      <span style={{ color: COLORS.primary, fontSize: "11px", fontWeight: 700 }}>
                        ✔ Verified
                      </span>
                    </div>

                    {/* Review Snippet */}
                    <p
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "14px",
                        color: COLORS.textSecondary,
                        lineHeight: "1.6",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      "{rev.positive}"
                    </p>
                  </div>

                  {/* Card Bottom: Read Link + Editorial Quote Icon */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                      borderTop: `1px solid ${COLORS.lightBorder}`,
                      paddingTop: "14px",
                    }}
                  >
                    <span
                      onClick={() => window.open(bookingUrl, "_blank")}
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "12px",
                        letterSpacing: "0.05em",
                        color: COLORS.primary,
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      Read Original Review →
                    </span>
                    <span
                      style={{
                        fontSize: "36px",
                        color: COLORS.stone,
                        fontFamily: "Cormorant Garamond, serif",
                        lineHeight: "0",
                        height: "10px",
                        transform: "translateY(8px)",
                        userSelect: "none",
                      }}
                    >
                      ”
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
                boxShadow: "0 4px 14px rgba(28, 18, 9, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s, background 0.2s",
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
  // Google Maps embed URL for Arish Luxury Suites, Skardu
  const mapEmbedUrl = "https://maps.google.com/maps?q=Arish+Luxury+Suites+Skardu&t=&z=15&ie=UTF8&iwloc=&output=embed";
  
  // Direct Google Maps link for opening in a new tab / app
  const directMapUrl = "https://www.google.com/maps/search/?api=1&query=Arish+Luxury+Suites+Skardu";

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
              }}
            >
              📍 <strong style={{ color: COLORS.textPrimary }}>572 Sumbul Town, Olding, Skardu</strong>
              <span style={{ display: "block", marginTop: "4px", fontSize: "13px" }}>
                Plus Code: <strong>7JMW+34 Skardu, Gilgit-Baltistan, Pakistan</strong>
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
                boxShadow: "0 6px 18px rgba(23, 74, 59, 0.25)",
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
                title="Arish Luxury Suites Accurate Location"
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