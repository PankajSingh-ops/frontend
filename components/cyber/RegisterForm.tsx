"use client";

import React, { useState, useRef } from "react";
import {
  CYBER_CONTENT,
  submitRegistration,
  RegistrationPayload,
} from "@/lib/cyber-content";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  MapPin,
  GraduationCap,
  Shield,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Home,
  AlertCircle,
  Lock,
} from "lucide-react";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    profession: "",
    city: "",
    education: "",
    consent: false,
    honeypot: "", // Hidden spam trap field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState("ENCRYPTING & TRANSMITTING...");
  const [isSuccess, setIsSuccess] = useState(false);
  const [assignedWarriorId, setAssignedWarriorId] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  // Field validation rules
  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case "fullName": {
        const str = (value as string).trim();
        if (!str) return "Full Name is required.";
        if (str.length < 2) return "Name must be at least 2 characters.";
        if (!/^[a-zA-Z\s.'-]+$/.test(str)) {
          return "Only letters, spaces, and punctuation (.'-) allowed.";
        }
        return "";
      }
      case "email": {
        const str = (value as string).trim();
        if (!str) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
          return "Please enter a valid email address.";
        }
        return "";
      }
      case "phone": {
        const raw = (value as string).trim();
        // Extract 10-digit mobile, ignoring +91 or leading 0
        const digits = raw.replace(/^(\+91|0)/, "").replace(/\D/g, "");
        if (!digits) return "10-digit mobile number is required.";
        if (!/^[6-9]\d{9}$/.test(digits)) {
          return "Enter a valid 10-digit Indian mobile number (starting with 6-9).";
        }
        return "";
      }
      case "dob": {
        const str = value as string;
        if (!str) return "Date of birth is required.";
        const date = new Date(str);
        const now = new Date();
        if (isNaN(date.getTime())) return "Please enter a valid date.";
        if (date > now) return "Date of birth cannot be in the future.";
        const ageYears = (now.getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
        if (ageYears < 10) return "Must be at least 10 years old to enroll.";
        if (ageYears > 120) return "Please enter a realistic date of birth.";
        return "";
      }
      case "profession": {
        if (!value) return "Please select your current profession.";
        return "";
      }
      case "city": {
        const str = (value as string).trim();
        if (!str) return "City is required.";
        if (str.length < 2) return "City must be at least 2 characters.";
        return "";
      }
      case "education": {
        if (!value) return "Please select your education qualification.";
        return "";
      }
      case "consent": {
        if (!value) return "You must agree to be contacted for the programme.";
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const err = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, val);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    const fieldKeys = [
      "fullName",
      "email",
      "phone",
      "dob",
      "profession",
      "city",
      "education",
      "consent",
    ];

    fieldKeys.forEach((key) => {
      const val = formData[key as keyof typeof formData];
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    });

    setTouched(
      fieldKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus first invalid field
      const firstInvalidKey = fieldKeys.find((key) => newErrors[key]);
      if (firstInvalidKey) {
        const el = document.getElementById(`field-${firstInvalidKey}`);
        if (el) el.focus();
      }
      setAnnouncement("Form contains errors. Please correct highlighted fields.");
      return;
    }

    // Submit process
    setIsSubmitting(true);
    setAnnouncement("Transmitting registration details...");

    const phases = [
      "VERIFYING IDENTITY & CREDENTIALS...",
      "ESTABLISHING SECURE TLS TUNNEL...",
      "REGISTERING TO MISSION 1 MILLION...",
    ];

    let phaseIndex = 0;
    const interval = setInterval(() => {
      phaseIndex = (phaseIndex + 1) % phases.length;
      setSubmitPhase(phases[phaseIndex]);
    }, 450);

    try {
      /**
       * TODO: Replace this simulated submitRegistration call with the actual API integration
       * (e.g. await fetch('/api/cyber-warrior/enlist', { method: 'POST', body: JSON.stringify(formData) }))
       */
      const payload: RegistrationPayload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        dob: formData.dob,
        profession: formData.profession,
        city: formData.city.trim(),
        education: formData.education,
        consent: formData.consent,
        honeypot: formData.honeypot,
      };

      const result = await submitRegistration(payload);

      clearInterval(interval);
      setIsSubmitting(false);

      if (result.success) {
        setAssignedWarriorId(result.warriorId);
        setIsSuccess(true);
        setAnnouncement(`Welcome, ${formData.fullName.split(" ")[0]}. You have been successfully registered.`);
      }
    } catch {
      clearInterval(interval);
      setIsSubmitting(false);
      setErrors({ form: "Transmission failed. Please verify your connection and try again." });
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      profession: "",
      city: "",
      education: "",
      consent: false,
      honeypot: "",
    });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    setAssignedWarriorId("");
    setAnnouncement("Form reset. Ready for new registration.");
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const firstName = formData.fullName.trim().split(" ")[0] || "Warrior";

  return (
    <div className="w-full relative">
      {/* Live Accessibility Announcer */}
      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      <div className="cyber-panel-glow p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden">
        {/* Top Header Bar of the HUD Card */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-5 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-sm bg-accent-cyan shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <span className="font-mono text-xs text-accent-cyan tracking-wider font-semibold">
              {"// ENLISTMENT_INTERFACE_V2.4"}
            </span>
          </div>
          <span className="font-mono text-[11px] text-muted flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-primary" />
            256-BIT ENCRYPTED
          </span>
        </div>

        {/* Card Title */}
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase">
            {isSuccess ? "ENLISTMENT CONFIRMED" : "ENLIST AS A CYBER WARRIOR"}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-muted mt-1">
            {isSuccess
              ? "Official digital credentials issued"
              : "Free national registration for Cybersecurity & AI self-defense"}
          </p>
        </div>

        {/* SUCCESS STATE */}
        {isSuccess ? (
          <div className="flex flex-col items-center text-center py-6 sm:py-8 animate-fadeIn">
            {/* Animated Shield with Draw Checkmark & Blue Confetti Sparks */}
            <div className="relative mb-6">
              {/* Particle Sparks Burst */}
              <div
                className="absolute -inset-6 rounded-full bg-primary/20 blur-xl animate-pulse pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute top-0 -left-4 w-2 h-2 rounded-full bg-accent-cyan animate-ping pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-2 -right-3 w-2 h-2 rounded-full bg-primary-glow animate-ping pointer-events-none"
                aria-hidden="true"
              />

              {/* Shield Hexagon Icon Frame */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-surface-2 border-2 border-accent-cyan/80 flex items-center justify-center relative shadow-[0_0_35px_rgba(34,211,238,0.4)]">
                <ShieldCheck className="w-14 h-14 sm:w-16 sm:h-16 text-accent-cyan" />
              </div>
            </div>

            {/* Greeting */}
            <span className="font-mono text-xs sm:text-sm text-accent-cyan font-semibold tracking-widest uppercase mb-1">
              {"// STATUS: DEFENDER ACTIVATED"}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide mb-2 uppercase">
              WELCOME, CYBER WARRIOR
            </h3>
            <p className="font-sans text-base sm:text-lg text-primary-glow font-semibold mb-3">
              Welcome, {firstName}.
            </p>
            <p className="text-sm sm:text-base text-muted max-w-md mx-auto mb-8 leading-relaxed">
              Your registration is successful. We&apos;ll reach out with next steps on your email shortly.
            </p>

            {/* Decorative Digital Warrior ID Badge */}
            <div className="w-full max-w-sm p-5 rounded-2xl bg-surface border border-primary/40 relative overflow-hidden mb-8 shadow-inner">
              <div className="flex justify-between items-center font-mono text-[11px] text-muted mb-2 border-b border-line pb-2">
                <span>IDENTITY IDENTIFIER</span>
                <span className="text-accent-cyan font-bold">DIGITAL KAVACH</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs text-muted">ASSIGNED CODE</div>
                  <div className="font-display text-2xl sm:text-3xl text-white tracking-widest">
                    {assignedWarriorId}
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary text-[10px] font-mono text-accent-cyan font-bold">
                  ACTIVE
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary-glow transition-all shadow-[0_0_15px_rgba(47,123,255,0.4)] active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                Register another warrior
              </button>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs sm:text-sm text-muted hover:text-white bg-surface-2 border border-line hover:border-primary/40 transition-all"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* Hidden Honeypot Trap Field */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="field-honeypot">Leave blank</label>
              <input
                id="field-honeypot"
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={handleChange}
              />
            </div>

            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5 relative">
                <label
                  htmlFor="field-fullName"
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-accent-cyan" />
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="field-fullName"
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "error-fullName" : undefined}
                    className={`w-full min-h-[48px] px-4 py-3 rounded-xl bg-surface border text-base text-white placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all ${
                      errors.fullName && touched.fullName
                        ? "border-red-500/80 focus:border-red-500 animate-error-shake"
                        : "border-line focus:border-accent-cyan/80"
                    }`}
                  />
                </div>
                {errors.fullName && touched.fullName && (
                  <p
                    id="error-fullName"
                    className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 relative">
                <label
                  htmlFor="field-email"
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-accent-cyan" />
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="field-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "error-email" : undefined}
                    className={`w-full min-h-[48px] px-4 py-3 rounded-xl bg-surface border text-base text-white placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all ${
                      errors.email && touched.email
                        ? "border-red-500/80 focus:border-red-500 animate-error-shake"
                        : "border-line focus:border-accent-cyan/80"
                    }`}
                  />
                </div>
                {errors.email && touched.email && (
                  <p
                    id="error-email"
                    className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Phone & Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Phone */}
              <div className="flex flex-col gap-1.5 relative">
                <label
                  htmlFor="field-phone"
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-accent-cyan" />
                  Mobile Number <span className="text-red-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 font-mono text-sm text-accent-cyan select-none pointer-events-none font-semibold">
                    +91
                  </span>
                  <input
                    id="field-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="numeric"
                    required
                    placeholder="9876543210"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "error-phone" : undefined}
                    className={`w-full min-h-[48px] pl-14 pr-4 py-3 rounded-xl bg-surface border text-base text-white placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all ${
                      errors.phone && touched.phone
                        ? "border-red-500/80 focus:border-red-500 animate-error-shake"
                        : "border-line focus:border-accent-cyan/80"
                    }`}
                  />
                </div>
                {errors.phone && touched.phone && (
                  <p
                    id="error-phone"
                    className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col gap-1.5 relative">
                <label
                  htmlFor="field-dob"
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                  Date of Birth <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="field-dob"
                    type="date"
                    name="dob"
                    autoComplete="bday"
                    max={todayStr}
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.dob}
                    aria-describedby={errors.dob ? "error-dob" : undefined}
                    className={`w-full min-h-[48px] px-4 py-3 rounded-xl bg-surface border text-base text-white placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all [color-scheme:dark] ${
                      errors.dob && touched.dob
                        ? "border-red-500/80 focus:border-red-500 animate-error-shake"
                        : "border-line focus:border-accent-cyan/80"
                    }`}
                  />
                </div>
                {errors.dob && touched.dob && (
                  <p
                    id="error-dob"
                    className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.dob}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Profession & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Profession */}
              <div className="flex flex-col gap-1.5 relative">
                <label
                  htmlFor="field-profession"
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5 text-accent-cyan" />
                  Profession <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="field-profession"
                    name="profession"
                    required
                    value={formData.profession}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.profession}
                    aria-describedby={errors.profession ? "error-profession" : undefined}
                    className={`w-full min-h-[48px] px-4 py-3 rounded-xl bg-surface border text-base text-white focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all [color-scheme:dark] appearance-none cursor-pointer ${
                      errors.profession && touched.profession
                        ? "border-red-500/80 focus:border-red-500 animate-error-shake"
                        : "border-line focus:border-accent-cyan/80"
                    }`}
                  >
                    <option value="" disabled className="bg-surface text-muted">
                      Select your profession
                    </option>
                    {CYBER_CONTENT.form.professions.map((prof) => (
                      <option key={prof} value={prof} className="bg-surface text-white">
                        {prof}
                      </option>
                    ))}
                  </select>
                  {/* Dropdown Chevron */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                    ▼
                  </div>
                </div>
                {errors.profession && touched.profession && (
                  <p
                    id="error-profession"
                    className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.profession}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="flex flex-col gap-1.5 relative">
                <label
                  htmlFor="field-city"
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
                  City / Location <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="field-city"
                    type="text"
                    name="city"
                    autoComplete="address-level2"
                    required
                    placeholder="e.g. Mumbai, Delhi, Dehradun"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.city}
                    aria-describedby={errors.city ? "error-city" : undefined}
                    className={`w-full min-h-[48px] px-4 py-3 rounded-xl bg-surface border text-base text-white placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all ${
                      errors.city && touched.city
                        ? "border-red-500/80 focus:border-red-500 animate-error-shake"
                        : "border-line focus:border-accent-cyan/80"
                    }`}
                  />
                </div>
                {errors.city && touched.city && (
                  <p
                    id="error-city"
                    className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.city}
                  </p>
                )}
              </div>
            </div>

            {/* Row 4: Education Qualification */}
            <div className="flex flex-col gap-1.5 relative">
              <label
                htmlFor="field-education"
                className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-accent-cyan" />
                Education Qualification <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="field-education"
                  name="education"
                  required
                  value={formData.education}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.education}
                  aria-describedby={errors.education ? "error-education" : undefined}
                  className={`w-full min-h-[48px] px-4 py-3 rounded-xl bg-surface border text-base text-white focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all [color-scheme:dark] appearance-none cursor-pointer ${
                    errors.education && touched.education
                      ? "border-red-500/80 focus:border-red-500 animate-error-shake"
                      : "border-line focus:border-accent-cyan/80"
                  }`}
                >
                  <option value="" disabled className="bg-surface text-muted">
                    Select your education qualification
                  </option>
                  {CYBER_CONTENT.form.educationLevels.map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-surface text-white">
                      {lvl}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                  ▼
                </div>
              </div>
              {errors.education && touched.education && (
                <p
                  id="error-education"
                  className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.education}
                </p>
              )}
            </div>

            {/* Row 5: Consent Checkbox */}
            <div className="flex flex-col gap-1 mt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  id="field-consent"
                  type="checkbox"
                  name="consent"
                  required
                  checked={formData.consent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-5 h-5 mt-0.5 rounded border border-line bg-surface text-primary focus:ring-1 focus:ring-accent-cyan accent-primary cursor-pointer shrink-0"
                />
                <span className="text-xs sm:text-sm text-muted leading-relaxed">
                  I agree to be contacted about the Cyber Warriors programme, training modules, and digital safety updates. <span className="text-red-400">*</span>
                </span>
              </label>
              {errors.consent && touched.consent && (
                <p className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1 ml-8">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.consent}
                </p>
              )}
            </div>

            {/* General Form Error if any */}
            {errors.form && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 font-mono text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.form}
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[54px] rounded-xl font-mono text-sm sm:text-base font-bold text-white bg-primary hover:bg-primary-glow border border-primary-glow/60 shadow-[0_0_30px_rgba(47,123,255,0.4)] disabled:opacity-75 disabled:cursor-not-allowed transition-all relative overflow-hidden group flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-accent-cyan animate-spin" />
                    <span>{submitPhase}</span>
                  </div>
                ) : (
                  <>
                    <Shield className="w-5 h-5 text-accent-cyan" />
                    <span>ENLIST NOW {"//"} JOIN 1 MILLION</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}

                {/* Submitting Progress Indicator Line */}
                {isSubmitting && (
                  <div
                    className="absolute bottom-0 inset-x-0 h-1 bg-accent-cyan animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </button>

              <p className="font-mono text-[11px] text-center text-muted/70 mt-3">
                {"// ZERO REGISTRATION FEES · CERTIFICATE OF COMPLETION INCLUDED"}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
