import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomeContents() {
  const navigate = useNavigate();

  const slogans = [
    "High-performance desktops & laptops",
    "Build. Upgrade. Repair.",
    "Best prices. Genuine parts.",
    "Tech support you can trust",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // rotate slogans every 3s
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="w-full min-h-[calc(100vh-100px)] relative overflow-hidden">
      {/* Background image (public/home.jpg) with dark overlay for readable text */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/home.jpg')" }}
        role="img"
        aria-label="I-Computers shop interior background"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40"
        aria-hidden
      />

      {/* Hero content */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left lg:pl-6">
          <div className="inline-flex items-center gap-3 mb-4 justify-center md:justify-start">
            <span className="bg-white/10 text-white/90 px-3 py-1 rounded-full text-sm font-medium">
              I‑COMPUTERS
            </span>
            <span className="text-sm text-white/70">Since 2026</span>
          </div>

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Power your work.
            <span className="block text-indigo-400">Power your play.</span>
          </h1>

          {/* Animated slogans: stack all and fade/translate via classes to avoid layout shift */}
          <div
            className="mt-6 text-white/90 text-lg sm:text-xl md:text-2xl font-medium h-10 md:h-12 relative mx-auto md:mx-0"
            aria-live="polite"
          >
            {slogans.map((s, i) => (
              <span
                key={s}
                className={`absolute left-0 right-0 transition-all duration-700 ease-in-out transform ${
                  i === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-3">
            <button
              onClick={() => navigate("/products")}
              aria-label="Shop products"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 focus-visible:ring-4 focus-visible:ring-indigo-300 text-white px-5 py-3 rounded-2xl shadow-lg font-semibold transition-all"
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/contact")}
              aria-label="Contact us"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-2xl border border-white/10 focus-visible:ring-4 focus-visible:ring-white/20 transition-all"
            >
              Contact Us
            </button>
          </div>

          {/* Quick features */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto md:mx-0">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚡</div>
              <div>
                <h4 className="text-white font-semibold">Fast Delivery</h4>
                <p className="text-white/80 text-sm">
                  Same-day pickup & shipping options
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">🔧</div>
              <div>
                <h4 className="text-white font-semibold">Repairs & Upgrades</h4>
                <p className="text-white/80 text-sm">
                  Component-level service & diagnostics
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="text-white font-semibold">Warranty</h4>
                <p className="text-white/80 text-sm">
                  Official parts & 90‑day warranty
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side card: featured product preview */}
        <aside className="w-full md:w-96 bg-white/6 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">Featured: MSI Bravo 15</h3>
              <p className="text-white/80 text-sm mt-1">
                Built for performance & silence
              </p>
            </div>
            <div className="text-white/90 text-lg font-semibold">
              LKR 320000.00
            </div>
          </div>

          <div
            className="mt-4 w-full h-60 bg-white/5 rounded-lg flex items-center justify-center text-white/60"
            role="img"
            aria-label="Pro Gamer X product image placeholder"
          >
            <Link
              to={"/overview/AC-002"}
              className="cursor-pointer w-full h-60"
            >
              <img
                src="/MSI.png"
                className="w-full h-full object-contain"
                alt=""
              />
            </Link>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => navigate("/overview/AC-002")}
              className="flex-1 bg-indigo-500 text-white py-2 rounded-xl font-medium hover:bg-indigo-600 hover:cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500 transition-all"
            >
              View
            </button>
            <button
              onClick={() => {
                navigate("/cart");
                // you can add an add-to-cart handler here
              }}
              className="flex-1 bg-transparent border border-white/10 text-white py-2 rounded-xl hover:bg-white/10 hover:cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-white/10 transition-all"
            >
              Add
            </button>
          </div>
        </aside>
      </section>

      {/* Why choose us */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why choose I‑Computers?
            </h2>
            <p className="text-white/80 mt-4">
              We combine expert technicians, carefully selected components and
              honest pricing to give you the best computing experience — whether
              you’re a gamer, creator or a professional.
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Free diagnostics",
                "Custom PC builds",
                "Trade-in options",
                "Local support & warranty",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-white/5 p-4 rounded-xl"
                >
                  <span className="text-white text-xl">✔</span>
                  <span className="font-medium text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <div className="w-44 h-44 mx-auto rounded-full bg-white/5 flex items-center justify-center">
              <img src="Logo1.png" alt="logo" />
            </div>
            <p className="text-white/80 mt-4">
              Visit our store or browse online
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-4 w-full bg-white/10 py-2 rounded-xl font-medium text-white"
            >
              Browse catalog
            </button>
          </div>
        </div>
      </section>

      <div className="h-20" aria-hidden />
    </main>
  );
}
