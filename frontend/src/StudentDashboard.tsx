import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from './config';
import {
    LayoutDashboard, BookOpen, Compass, Award, LogOut,
    CheckCircle, AlertTriangle, X,
    ChevronRight,
    Menu, Sparkles, Zap, User, PlayCircle, Lock, BellRing, Trash2, Download, Clock, Mail, Phone
} from "lucide-react";
import { motion } from "framer-motion";

import BrandLogo from "./components/BrandLogo";
import { clearSession, getValidSession } from "./utils/session";

// --- TYPES ---
interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string;
    instructor_id: number;
    // ✅ Updated Fields
    course_type?: string;
    enrollment_type?: "paid" | "trial";
    days_left?: number;
    is_trial_expired?: boolean;
    has_certificate?: boolean;
}

// --- RAZORPAY SCRIPT LOADER ---
const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// --- 🟢 HELPER COMPONENTS ---

const NavItem = ({ icon, label, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold ${active
            ? "bg-blue-50 text-[#0A0A0A]"
            : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
    >
        {icon} {label}
    </button>
);

const StatCard = ({ icon: Icon, label, value }: any) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5 transition-all">
        <div className="p-3 rounded-xl bg-slate-100 text-slate-600"><Icon size={24} /></div>
        <div><h4 className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</h4><p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{label}</p></div>
    </motion.div>
);

const CourseCard = ({ course, type, navigate, handleFreeEnroll, openEnrollModal, handleDownloadSyllabus, onPayClick }: any) => {
    const getImageUrl = (url: string) => {
        if (!url) return "";
        return url.startsWith('http') ? url : `${API_BASE_URL.replace('/api/v1', '')}/${url}`;
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all relative group">

            {/* ✅ 1. COMPLETED RIBBON */}
            {course.has_certificate && (
                <div className="absolute top-4 -right-12 bg-yellow-400 text-yellow-900 text-[10px] font-extrabold px-12 py-1 rotate-45 z-20 shadow-md">
                    COMPLETED
                </div>
            )}

            <div className="h-40 bg-slate-200 relative flex items-center justify-center">
                {course.image_url ? (
                    <img src={getImageUrl(course.image_url)} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                    <BookOpen size={40} className="text-slate-400" />
                )}

                {/* Status Badges */}
                {type === "enrolled" && (
                    <div className="absolute top-2 left-2 flex gap-2">
                        {course.enrollment_type === "paid" ? (
                            <div className="bg-green-600 text-white px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                <CheckCircle size={10} /> PAID
                            </div>
                        ) : (
                            <div className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-sm ${course.is_trial_expired ? "bg-red-600 text-white" : "bg-orange-500 text-white"}`}>
                                <Clock size={10} /> {course.is_trial_expired ? "TRIAL ENDED" : `${course.days_left} DAYS LEFT`}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="p-5">
                <h4 className="font-bold text-slate-800 mb-4 truncate" title={course.title}>{course.title}</h4>

                <div className="flex justify-between items-center">
                    {/* ✅ 2. DYNAMIC PRICE / STATUS DISPLAY */}
                    {type === "enrolled" ? (
                        <div className="flex items-center gap-2">
                            {course.enrollment_type === "trial" ? (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onPayClick(course); }}
                                    className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-200 transition-colors border border-green-200 animate-pulse"
                                >
                                    Pay ₹{course.price}
                                </button>
                            ) : (
                                <span className="text-sm font-bold text-slate-400">Lifetime Access</span>
                            )}
                        </div>
                    ) : (
                        <span className={`text-lg font-extrabold ${course.price === 0 ? "text-[#C09A2E]" : "text-[#0A0A0A]"}`}>
                            {course.price === 0 ? "Free" : `₹${course.price}`}
                        </span>
                    )}

                    {/* ✅ 3. ACTION BUTTONS */}
                    {type === "available" ? (
                        <button onClick={() => course.price === 0 ? handleFreeEnroll(course.id) : openEnrollModal(course)} className={`px-4 py-2 rounded-lg text-white font-bold text-sm flex items-center gap-2 ${course.price === 0 ? "bg-[#C09A2E]" : "bg-[#0A0A0A]"}`}>
                            {course.price === 0 ? <Sparkles size={14} /> : <Lock size={14} />} {course.price === 0 ? "Enroll" : "Unlock"}
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDownloadSyllabus(course.description); }}
                                className="bg-white border border-slate-300 text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                                title="Download Syllabus"
                            >
                                <Download size={16} />
                            </button>

                            <button
                                onClick={() => navigate(`/course/${course.id}/player`)}
                                disabled={course.is_trial_expired} // 🚫 Disable if trial expired
                                className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors ${course.is_trial_expired ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-slate-800 text-white hover:bg-slate-900"}`}
                            >
                                <PlayCircle size={14} /> {course.is_trial_expired ? "Locked" : "Resume"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- 🔄 POLL RESULT HELPER (Added Globally) ---
// --- POLLING HELPER REMOVED (Lambda is sync) ---

// --- 🔵 MAIN COMPONENT ---

const StudentDashboard = () => {
    const navigate = useNavigate();
    const RAZORPAY_PAYLINK_URL = import.meta.env.VITE_RAZORPAY_PAYLINK_URL;
    const [activeTab, setActiveTab] = useState("home");

    const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [progressMap, setProgressMap] = useState<{ [key: number]: { percent: number, completed: number, total: number } }>({});
    const [collapsed, setCollapsed] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [studentProfile, setStudentProfile] = useState({ name: "Loading...", email: "...", phone: "" });
    const [newPassword, setNewPassword] = useState("");
    // ✅ MOVED: Mobile Menu State (Must be before conditional returns)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Modal & Settings
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
        show: false, message: "", type: "success"
    });

    // 🎨 PROFESSIONAL THEME PALETTE
    const brand = {
        brandPrimary: "#0A0A0A", brandAccent: "#C09A2E", mainBg: "#E2E8F0", cardBg: "#F8FAFC", border: "#cbd5e1", textMain: "#1e293b", textLight: "#64748b"
    };

    // ✅ Toast Helper
    const triggerToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };
    const getErrorMessage = (err: any, fallback: string) =>
        err?.response?.data?.detail || err?.response?.data?.message || err?.message || fallback;

    // ✅ INITIAL FETCH WITH SAFETY CHECKS
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } });
            setStudentProfile({
                name: res.data.full_name || "Student",
                email: res.data.email || "",
                phone: res.data.phone_number || ""
            });
        } catch (e) { console.error("Profile fetch error", e); }
    };

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/notifications`, { headers: { Authorization: `Bearer ${token}` } });
            setNotifications(res.data);
            setUnreadCount(res.data.filter((n: any) => !n.is_read).length);
        } catch (e) { console.error("Notif error", e); }
    };

    useEffect(() => {
        // Poll every 30s
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) { navigate("/"); return; }

            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [allRes, myRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/courses`, config),
                axios.get(`${API_BASE_URL}/my-courses`, config)
            ]);

            // SAFETY CHECK: Ensure we have arrays
            const allData = Array.isArray(allRes.data) ? allRes.data : [];
            const myData = Array.isArray(myRes.data) ? myRes.data : [];

            const myCourseIds = new Set(myData.map((c: any) => c.id));
            setAvailableCourses(allData.filter((c: any) => !myCourseIds.has(c.id)));
            setEnrolledCourses(myData);
        } catch (err: any) {
            if (err.response?.status === 401) { clearSession(); navigate("/login"); }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (!newPassword) return triggerToast("Please enter a new password", "error");

        try {
            const token = localStorage.getItem("token");
            await axios.post(`${API_BASE_URL}/user/change-password`,
                { new_password: newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            triggerToast("Password Updated Successfully!", "success");
            setNewPassword(""); // ✅ This uses the setter, fixing your error!
        } catch (err) {
            triggerToast("Failed to update password", "error");
        }
    };

    useEffect(() => {
        const session = getValidSession();
        if (!session) { navigate("/login"); return; }
        if (session.role === "instructor") { navigate("/dashboard"); return; }
        fetchData();
        fetchProfile();
    }, []);

    useEffect(() => {
        if (enrolledCourses.length > 0) {
            enrolledCourses.forEach(course => {
                fetchCourseProgress(course.id);
            });
        }
    }, [enrolledCourses]);

    const fetchCourseProgress = async (courseId: number) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/courses/${courseId}/player`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const modules = res.data?.modules || [];

            // Count items that are explicitly completed OR marked complete by instructor
            const completed = modules.reduce((acc: number, m: any) => acc + m.lessons.filter((l: any) => l.is_completed).length, 0);

            // Calculate total lessons count, not just modules
            const totalLessons = modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);

            const percent = totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100);

            // Save to map using Course ID as key
            setProgressMap(prev => ({
                ...prev,
                [courseId]: { percent, completed, total: totalLessons }
            }));
        } catch (err) { console.error("Failed to fetch progress", err); }
    };

    const handleFreeEnroll = async (courseId: number) => {
        setProcessing(true);
        try {
            await axios.post(`${API_BASE_URL}/enroll/${courseId}`, { type: "paid" }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            triggerToast("🎉 Enrolled!", "success"); fetchData(); setActiveTab("learning");
        } catch (err) { triggerToast("Enrollment failed.", "error"); } finally { setProcessing(false); }
    };

    const handleEnrollStrategy = async (type: "trial" | "paid") => {
        if (!selectedCourse) return;
        setProcessing(true);

        try {
            if (type === "trial") {
                await axios.post(`${API_BASE_URL}/enroll/${selectedCourse.id}`,
                    { type: "trial" },
                    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                );
                triggerToast(`🎉 Free Trial Started for ${selectedCourse.title}!`, "success");
                fetchData(); setShowModal(false); setActiveTab("learning");
            } else {
                const isLoaded = await loadRazorpayScript();
                if (!isLoaded) { triggerToast("SDK Failed to load", "error"); return; }
                const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
                if (!razorpayKey || String(razorpayKey).includes("replace_me")) {
                    triggerToast("Set a valid VITE_RAZORPAY_KEY_ID in frontend/.env", "error");
                    return;
                }

                const token = localStorage.getItem("token");
                const orderRes = await axios.post(`${API_BASE_URL}/create-order`,
                    { course_id: selectedCourse.id },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const options = {
                    key: razorpayKey,
                    amount: orderRes.data.amount,
                    currency: orderRes.data.currency,
                    name: "KOMBAN LMS",
                    description: `Unlock ${selectedCourse.title}`,
                    order_id: orderRes.data.id,
                    handler: async function (response: any) {
                        await axios.post(
                            `${API_BASE_URL}/payment/verify`,
                            {
                                course_id: selectedCourse.id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        triggerToast("🎉 Payment Successful! Course Unlocked.", "success");
                        fetchData(); setShowModal(false); setActiveTab("learning");
                    },
                    prefill: { name: "Student", email: "student@komban.com" },
                    theme: { color: "#0A0A0A" },
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            }
        } catch (err: any) {
            triggerToast(getErrorMessage(err, "Transaction Failed."), "error");
        } finally {
            setProcessing(false);
        }
    };

    const handleDownloadCertificate = async (courseId: number, courseTitle: string) => {
        triggerToast("Downloading certificate...", "success");
        try {
            const response = await axios.get(`${API_BASE_URL}/generate-pdf/${courseId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            triggerToast("Failed to download certificate. Try again.", "error");
        }
    };

    // ✅ NEW: Handle Syllabus Download (Direct Link)
    const handleDownloadSyllabus = (url: string) => {
        if (!url) {
            triggerToast("No syllabus link available.", "error");
            return;
        }
        window.open(url, '_blank');
    };

    const openEnrollModal = (course: Course) => { setSelectedCourse(course); setShowModal(true); };
    const handleLogout = () => { clearSession(); navigate("/"); };

    // ✅ LOADING SPINNER UI
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#E2E8F0]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A0A0A]"></div>
                    <p className="text-slate-600 font-bold animate-pulse">Loading KOMBAN LMS...</p>
                </div>
            </div>
        );
    }



    // --- DASHBOARD UI ---
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">

            {/* 1. HEADER BAR */}
            <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">

                {/* Left: Logo & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-slate-600 hover:text-[#0A0A0A]">
                        <Menu size={24} />
                    </button>
                    <BrandLogo size="md" showTagline />
                </div>

                {/* Center: Desktop Navigation Menu */}
                <nav className="hidden lg:flex items-center gap-2">
                    <NavItem icon={<LayoutDashboard size={18} />} label="Home" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
                    <NavItem icon={<BookOpen size={18} />} label="My Learning" active={activeTab === "learning"} onClick={() => setActiveTab("learning")} />
                    <NavItem icon={<Compass size={18} />} label="Explore" active={activeTab === "explore"} onClick={() => setActiveTab("explore")} />
                    <NavItem icon={<Award size={18} />} label="Certificates" active={activeTab === "certificates"} onClick={() => setActiveTab("certificates")} />
                </nav>

                {/* Right: Actions (Notification & Profile) */}
                <div className="flex items-center gap-2 lg:gap-4">

                    {/* Notification Bell */}
                    <button
                        onClick={() => {
                            setActiveTab("notifications");
                            setUnreadCount(0);
                            axios.patch(`${API_BASE_URL}/notifications/read`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
                        }}
                        className="relative p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                    >
                        <BellRing size={20} />
                        {unreadCount > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold shadow-md hover:scale-105 transition-transform">
                            <User size={18} className="lg:w-5 lg:h-5" />
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50 animate-fade-in">
                                <div className="mb-3 border-b border-slate-100 pb-3">
                                    <p className="font-bold text-slate-800 truncate">{studentProfile.name}</p>
                                    <p className="text-xs text-slate-500 truncate">{studentProfile.email}</p>
                                    {studentProfile.phone && (
                                        <p className="text-xs text-slate-400 truncate mt-0.5">{studentProfile.phone}</p>
                                    )}
                                </div>
                                <button onClick={() => { setActiveTab("profile"); setShowProfileMenu(false); }} className="flex items-center gap-3 w-full p-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-[#0A0A0A] text-sm font-bold mb-1 transition-colors">
                                    <User size={16} /> Profile
                                </button>
                                <button onClick={handleLogout} className="flex items-center gap-3 w-full p-2 rounded-lg text-red-500 hover:bg-red-50 text-sm font-bold transition-colors">
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle (Visible on small screens) */}
                    <button className="md:hidden p-2 text-slate-600" onClick={() => setCollapsed(!collapsed)}>
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* 2. MOBILE MENU OVERLAY */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className="absolute left-0 top-0 h-full w-64 bg-white shadow-2xl p-6 flex flex-col gap-6"
                    >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <span className="text-xl font-extrabold text-[#0A0A0A]">KOMBAN <span className="text-[#C09A2E]">LMS</span></span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-2">
                            <NavItem icon={<LayoutDashboard size={20} />} label="Home" active={activeTab === "home"} onClick={() => { setActiveTab("home"); setIsMobileMenuOpen(false); }} />
                            <NavItem icon={<BookOpen size={20} />} label="My Learning" active={activeTab === "learning"} onClick={() => { setActiveTab("learning"); setIsMobileMenuOpen(false); }} />
                            <NavItem icon={<Compass size={20} />} label="Explore" active={activeTab === "explore"} onClick={() => { setActiveTab("explore"); setIsMobileMenuOpen(false); }} />
                            <NavItem icon={<Award size={20} />} label="Certificates" active={activeTab === "certificates"} onClick={() => { setActiveTab("certificates"); setIsMobileMenuOpen(false); }} />
                        </nav>

                        <div className="mt-auto border-t border-slate-100 pt-4">
                            <button onClick={handleLogout} className="flex items-center gap-3 w-full p-2 rounded-lg text-red-500 hover:bg-red-50 text-sm font-bold transition-colors">
                                <LogOut size={20} /> Logout
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* 3. MAIN CONTENT AREA (Full Width) */}
            <main className="p-4 lg:p-8 max-w-7xl mx-auto">

                {/* Dynamic Title based on Tab */}
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-800">
                        {activeTab === "home" && "Dashboard Overview"}
                        {activeTab === "learning" && "My Learning"}
                        {activeTab === "explore" && "Explore Courses"}
                        {activeTab === "certificates" && "My Achievements"}
                        {activeTab === "notifications" && "Notifications"}
                        {activeTab === "profile" && "My Profile"}
                    </h2>
                    <p className="text-slate-500 font-medium">Welcome to your student portal</p>
                </div>

                {/* --- CONTENT SECTIONS --- */}

                {/* NOTIFICATIONS TAB */}
                {activeTab === "notifications" && (
                    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
                        {notifications.length === 0 ? (
                            <div className="text-center py-20 text-slate-400 italic bg-white rounded-xl border border-dashed border-slate-300">No notifications yet.</div>
                        ) : (
                            notifications.map((n) => (
                                <div key={n.id} className={`p-5 rounded-xl border flex gap-4 transition-all ${n.is_read ? "bg-white border-slate-200" : "bg-blue-50 border-blue-200"}`}>
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full h-fit"><BellRing size={20} /></div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800">{n.title}</h4>
                                        <p className="text-slate-600 text-sm mt-1">{n.message}</p>
                                        <span className="text-xs text-slate-400 mt-2 block">{new Date(n.created_at).toLocaleString()}</span>
                                    </div>
                                    <button onClick={async () => { await axios.delete(`${API_BASE_URL}/notifications/${n.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }); fetchNotifications(); }} className="text-slate-300 hover:text-red-500 h-fit"><Trash2 size={18} /></button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* HOME TAB */}
                {activeTab === "home" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard icon={BookOpen} label="Courses Enrolled" value={enrolledCourses.length} />
                            <StatCard icon={Award} label="Certificates Earned" value={0} />
                            <StatCard icon={CheckCircle} label="Lessons Completed" value={Object.values(progressMap).reduce((acc, p) => acc + p.completed, 0)} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Continue Learning</h3>
                            {enrolledCourses.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {enrolledCourses.slice(0, 2).map((course) => { // Show max 2 here
                                        const prog = progressMap[course.id] || { percent: 0, completed: 0, total: 0 };
                                        return (
                                            <div key={course.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                                                <div className="w-full md:w-1/3 h-32 bg-slate-100 rounded-xl overflow-hidden">
                                                    {course.image_url ? <img src={course.image_url} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-slate-300"><BookOpen /></div>}
                                                </div>
                                                <div className="flex-1 w-full">
                                                    <h4 className="font-bold text-lg text-slate-800 mb-2">{course.title}</h4>
                                                    {/* ✅ USING ZAP HERE */}
                                                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#0A0A0A] uppercase tracking-wide">
                                                        <Zap size={14} className="text-yellow-500" fill="currentColor" /> In Progress
                                                    </div>
                                                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2"><div className="bg-[#0A0A0A] h-2 rounded-full" style={{ width: `${prog.percent}%` }}></div></div>
                                                    <div className="flex justify-between text-xs text-slate-500 font-bold mb-4"><span>{prog.percent}% Complete</span><span>{prog.completed}/{prog.total} Lessons</span></div>
                                                    {/* ✅ USING CHEVRONRIGHT HERE */}
                                                    <button onClick={() => navigate(`/course/${course.id}/player`)} className="w-full py-2 bg-[#0A0A0A] text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                                        Resume <ChevronRight size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-white p-10 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400">You haven't enrolled in any courses yet.</div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* LEARNING TAB */}
                {activeTab === "learning" && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrolledCourses
                                .filter(c => c.course_type !== "coding")
                                .map(c => (
                                    <CourseCard
                                        key={c.id}
                                        course={c}
                                        type="enrolled"
                                        navigate={navigate}
                                        handleDownloadSyllabus={handleDownloadSyllabus}
                                        onPayClick={(course: Course) => {
                                            // Reuse modal logic for payment
                                            setSelectedCourse(course);
                                            setShowModal(true);
                                        }}
                                    />
                                ))
                            }
                            {enrolledCourses.length === 0 && <div className="col-span-full text-center py-20 text-slate-400">No active courses.</div>}
                        </div>
                    </div>
                )}

                {/* EXPLORE TAB */}
                {activeTab === "explore" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableCourses.map(c => <CourseCard key={c.id} course={c} type="available" handleFreeEnroll={handleFreeEnroll} openEnrollModal={openEnrollModal} />)}
                    </div>
                )}

                {/* CERTIFICATES TAB */}
                {activeTab === "certificates" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {enrolledCourses.map(course => (
                                <div key={course.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${course.has_certificate ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                                            {course.has_certificate ? <Award size={24} /> : <Lock size={24} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{course.title}</h4>
                                            {course.has_certificate ? (
                                                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded mt-1 inline-block">COMPLETED</span>
                                            ) : (
                                                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded mt-1 inline-block">INCOMPLETE</span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => course.has_certificate ? handleDownloadCertificate(course.id, course.title) : triggerToast("Complete the course first!", "error")}
                                        disabled={!course.has_certificate}
                                        className={`p-2 rounded-lg transition-colors ${course.has_certificate ? "text-[#0A0A0A] hover:bg-blue-50 cursor-pointer" : "text-slate-300 cursor-not-allowed"}`}
                                        title={course.has_certificate ? "Download Certificate" : "Locked: Complete Course First"}
                                    >
                                        <Download size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* PROFILE TAB */}
                {activeTab === "profile" && (
                    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <User size={20} className="text-[#5755D9]" /> Profile Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                                    <User size={18} className="text-slate-400 mt-0.5 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Student Name</p>
                                        <p className="text-sm font-bold text-slate-800 break-words">{studentProfile.name || "—"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                                    <Mail size={18} className="text-slate-400 mt-0.5 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Email</p>
                                        <p className="text-sm font-bold text-slate-800 break-all">{studentProfile.email || "—"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                                    <Phone size={18} className="text-slate-400 mt-0.5 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Contact</p>
                                        <p className="text-sm font-bold text-slate-800 break-words">{studentProfile.phone || "Not provided"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Lock size={20} className="text-slate-400" /> Change Password</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New Password</label>
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#5755D9]" />
                                </div>
                                <button onClick={handleUpdatePassword} className="w-full py-3 bg-[#091941] hover:bg-[#5755D9] text-white rounded-xl font-bold transition-all">Update Password</button>
                            </div>
                        </div>
                    </div>
                )}

            </main>


            {/* 🔵 ENROLLMENT MODAL (Correctly Placed Outside Main Loop) */}
            {showModal && selectedCourse && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-xl shadow-2xl max-w-sm w-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0A0A0A] to-[#C09A2E]"></div>
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20} /></button>

                        <div className="p-6 pb-0">
                            <h3 className="text-xl font-extrabold text-slate-800 mb-1">Unlock Course</h3>
                            <p className="text-slate-500 text-xs">You are about to unlock <strong>{selectedCourse.title}</strong>.</p>
                        </div>

                        <div className="p-6">
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 flex items-center justify-between">
                                <div><span className="block text-[10px] font-bold text-slate-400 uppercase">Price</span><span className="text-2xl font-extrabold text-[#0A0A0A]">₹{selectedCourse.price}</span></div>
                                <div className="text-right"><span className="block text-[10px] font-bold text-slate-400 uppercase">Access</span><span className="text-sm font-bold text-slate-700">Lifetime</span></div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button onClick={() => handleEnrollStrategy("paid")} disabled={processing} className="w-full py-3 rounded-lg bg-[#0A0A0A] hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                                    {processing ? "Processing..." : <><Lock size={16} /> Pay & Unlock Now</>}
                                </button>
                                {RAZORPAY_PAYLINK_URL && (
                                    <button
                                        onClick={() => handleEnrollStrategy("paid")}
                                        className="w-full py-3 rounded-lg bg-white border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm"
                                    >
                                        Pay via Razorpay Link
                                    </button>
                                )}

                                {/* ✅ FIX: Hide trial button if user is already on a trial */}
                                {selectedCourse.enrollment_type !== "trial" && (
                                    <button onClick={() => handleEnrollStrategy("trial")} disabled={processing} className="w-full py-3 rounded-lg bg-white border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm">
                                        Start 7-Day Free Trial
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* ✅ PROFESSIONAL TOAST UI */}
            {toast.show && (
                <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999, background: "white", padding: "16px 24px", borderRadius: "12px", boxShadow: "0 10px 30px -5px rgba(0,0,0,0.15)", borderLeft: `6px solid ${toast.type === "success" ? brand.brandAccent : "#ef4444"}`, display: "flex", alignItems: "center", gap: "12px", animation: "slideIn 0.3s ease-out" }}>
                    {toast.type === "success" ? <CheckCircle size={24} color={brand.brandAccent} /> : <AlertTriangle size={24} color="#ef4444" />}
                    <div><h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "700", color: brand.textMain }}>{toast.type === "success" ? "Success" : "Alert"}</h4><p style={{ margin: 0, fontSize: "13px", color: brand.textLight }}>{toast.message}</p></div>
                    <button onClick={() => setToast({ ...toast, show: false })} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "10px" }}><X size={16} color="#94a3b8" /></button>
                    <style>{`@keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;