import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const GetInTouch = () => {
  const location = useLocation();
  const isStandalonePage = location.pathname === "/contact";
  const [loading, setLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post("https://tastykitchen-backend.vercel.app/contacts", data)
      .then(() => {
        toast.dismiss();
        toast.success("Nachricht erfolgreich gesendet!");
        reset();
        setLoading(false);
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Fehler beim Senden der Kontaktanfrage");
        setLoading(false);
      });
  };

  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Karlsfelder+Str.+13,+80995+München",
      "_blank"
    );
  };

  return (
    <>
      <section id="contact-section" className="w-full py-20 bg-white" ref={ref}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              Kontakt
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Schreiben Sie uns
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Haben Sie Fragen? Wir helfen Ihnen gerne weiter.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={
                isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
              }
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Vor- und Nachname
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name ist erforderlich" })}
                    className={`w-full px-4 py-3.5 bg-gray-50 border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200`}
                    placeholder="Max Mustermann"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    E-Mail-Adresse
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "E-Mail ist erforderlich",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Ungültige E-Mail-Adresse",
                      },
                    })}
                    className={`w-full px-4 py-3.5 bg-gray-50 border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200`}
                    placeholder="max@mustermann.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Ihre Nachricht
                  </label>
                  <textarea
                    id="message"
                    rows="8"
                    {...register("message", {
                      required: "Nachricht ist erforderlich",
                    })}
                    className={`w-full px-4 py-3.5 bg-gray-50 border ${
                      errors.message ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none`}
                    placeholder="Ihre Nachricht..."
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group relative overflow-hidden"
                  style={{ backgroundColor: "#e53935" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d32f2f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e53935")
                  }
                >
                  {loading ? (
                    <>
                      <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                      <span>Wird gesendet...</span>
                    </>
                  ) : (
                    <>
                      <span>Nachricht senden</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <iframe
                  title="Tasty Kitchen Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.7234567890123!2d11.4567890123456!3d48.1789012345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDEwJzQ0LjAiTiAxMcKwMjcnMjQuNCJF!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde&q=Karlsfelder+Str.+13,+80995+München"
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full"
                ></iframe>

                {/* Open in Google Maps Button Overlay */}
                <button
                  onClick={openGoogleMaps}
                  className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center space-x-2 font-medium text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span>In Google Maps öffnen</span>
                </button>
              </div>

              {/* Contact Cards */}
              <div className="grid gap-4">
                {/* Opening Hours */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Öffnungszeiten
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mo - Fr</span>
                          <span className="font-medium text-gray-900">
                            10:00 - 22:00
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Samstag</span>
                          <span className="font-medium text-gray-900">
                            11:00 - 23:00
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sonntag</span>
                          <span className="font-medium text-gray-900">
                            11:00 - 21:00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Adresse
                      </h3>
                      <p className="text-sm text-gray-600">
                        Tasty Kitchen
                        <br />
                        Karlsfelder Str. 13
                        <br />
                        80995 München
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-2">
                        Telefon
                      </h3>
                      <a
                        href="tel:+49893148784"
                        className="text-sm text-primary hover:underline"
                      >
                        089 3148784
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {isStandalonePage && <Footer />}
    </>
  );
};

export default GetInTouch;
