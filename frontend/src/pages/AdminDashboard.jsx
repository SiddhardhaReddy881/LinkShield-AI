import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import ScanPieChart from "../components/admin/ScanPieChart";
import ScanBarChart from "../components/admin/ScanBarChart";
import ScanTrendsChart from "../components/admin/ScanTrendsChart";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";

import {
  Users,
  UserCheck,
  UserX,
  Activity,
  Shield,
  AlertTriangle,
  ShieldAlert,
  ScanSearch,
  Globe,
  Download,
  Trash2,
  RefreshCw,
  Search,
  Calendar,
  Mail,
  Lock,
} from "lucide-react";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview"); // overview, scans, countries, users
  const [stats, setStats] = useState({
    total_users: 0,
    online_users: 0,
    today_visitors: 0,
    registered_users: 0,
    inactive_users: 0,
    scans_today: 0,
    safe: 0,
    suspicious: 0,
    malicious: 0,
    total_scans: 0,
  });

  const [recentScans, setRecentScans] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [scanTrends, setScanTrends] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [recentLogins, setRecentLogins] = useState([]);

  const [scansSearch, setScansSearch] = useState("");
  const [usersSearch, setUsersSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiError, setApiError] = useState(null);

  const isMalicious = (classification) =>
    classification === "MALICIOUS" || classification === "DANGEROUS";

  const maxScanIdRef = useRef(0);

  useEffect(() => {
    loadAllData(true);

    const interval = setInterval(() => {
      loadAllData(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const playAlertSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("Failed to play sound:", e);
    }
  };

  const loadAllData = async (isFirstLoad = false) => {
    if (isFirstLoad) setLoading(true);
    else setRefreshing(true);

    try {
      const [
        statsRes,
        scansRes,
        countriesRes,
        trendsRes,
        usersRes,
        loginsRes,
      ] = await Promise.all([
        API.get("/admin/stats"),
        API.get("/admin/recent-scans"),
        API.get("/admin/top-countries"),
        API.get("/admin/scan-trends"),
        API.get("/admin/users"),
        API.get("/admin/recent-logins"),
      ]);

      setStats({
        total_users: statsRes.data.total_users,
        online_users: statsRes.data.online_users,
        today_visitors: statsRes.data.today_visitors,
        registered_users: statsRes.data.registered_users,
        inactive_users:
          statsRes.data.total_users - statsRes.data.online_users,
        scans_today: statsRes.data.scans_today,
        safe: statsRes.data.safe,
        suspicious: statsRes.data.suspicious,
        malicious: statsRes.data.malicious,
        total_scans: statsRes.data.total_scans,
      });

      const newScans = scansRes.data;
      setRecentScans(newScans || []);
      setTopCountries(countriesRes.data || []);
      setScanTrends(trendsRes.data || null);
      setUsersList(usersRes.data || []);
      setRecentLogins(loginsRes.data || []);

      // Live Notifications Logic
      if (newScans && newScans.length > 0) {
        const currentMaxId = Math.max(...newScans.map((s) => s.id), 0);

        if (maxScanIdRef.current > 0) {
          const maliciousScans = newScans.filter(
            (s) => s.id > maxScanIdRef.current && isMalicious(s.classification)
          );

          if (maliciousScans.length > 0) {
            playAlertSound();
            maliciousScans.forEach((scan) => {
              toast.error(
                `🚨 Malicious Link Blocked!\nScore: ${scan.threat_score}/100\nURL: ${scan.url}`,
                {
                  duration: 6000,
                  position: "top-right",
                  style: {
                    background: "#7f1d1d",
                    color: "#ffffff",
                    border: "2px solid #ef4444",
                    borderRadius: "16px",
                  },
                }
              );
            });
          }
        }

        if (currentMaxId > maxScanIdRef.current) {
          maxScanIdRef.current = currentMaxId;
        }
      }
      setApiError(null);
    } catch (err) {
      console.error("Error loading admin dashboard statistics:", err);
      const message =
        err.response?.status === 404
          ? "Admin API not found. Backend may need redeploying."
          : "Unable to sync with backend. Check API connection.";
      setApiError(message);
      if (isFirstLoad) {
        toast.error(message);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;

    try {
      await API.delete(`/admin/users/${userId}`);
      toast.success(`User "${username}" deleted.`);
      loadAllData(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  const exportCSVReport = () => {
    const csvSections = [];

    // Section 1: Overview stats
    csvSections.push("=== EXECUTIVE OVERVIEW ===");
    csvSections.push("Metric,Value");
    csvSections.push(`Total Scans,${stats.total_scans}`);
    csvSections.push(`Scans Today,${stats.scans_today}`);
    csvSections.push(`Safe Scans,${stats.safe}`);
    csvSections.push(`Suspicious Scans,${stats.suspicious}`);
    csvSections.push(`Malicious Scans,${stats.malicious}`);
    csvSections.push(`Total Registered Users,${stats.total_users}`);
    csvSections.push(`Online Users,${stats.online_users}`);
    csvSections.push(`Today's Visitors,${stats.today_visitors}`);
    csvSections.push("");

    // Section 2: Top Countries
    csvSections.push("=== GEOGRAPHIC THREAT ORIGINS ===");
    csvSections.push("Country,Scan Count");
    topCountries.forEach((c) => {
      csvSections.push(`"${c.country}",${c.count}`);
    });
    csvSections.push("");

    // Section 3: Recent Scans
    csvSections.push("=== RECENT SCANS LOG ===");
    csvSections.push("URL,Score,Classification,Country,IP,Scan Date");
    recentScans.forEach((s) => {
      csvSections.push(
        `"${s.url}",${s.threat_score},"${s.classification}","${s.country || "N/A"}","${s.ip || "N/A"}","${s.scan_date}"`
      );
    });
    csvSections.push("");

    // Section 4: Users
    csvSections.push("=== REGISTERED USERS ===");
    csvSections.push("Username,Email,Status,Last Login,Created At");
    usersList.forEach((u) => {
      csvSections.push(
        `"${u.username}","${u.email}","${u.is_online ? "ONLINE" : "OFFLINE"}","${u.last_login || "N/A"}","${u.created_at}"`
      );
    });

    const csvContent = csvSections.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "LinkShield_Admin_Report.csv");
    toast.success("CSV Report downloaded.");
  };

  const exportPDFReport = () => {
    const doc = new jsPDF();
    const date = new Date();

    // Title Section
    doc.setFontSize(22);
    doc.setTextColor(34, 197, 94); // Green
    doc.text("LinkShield AI", 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // Dark slate
    doc.text("Executive Administration Security Report", 20, 30);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(
      `Generated On: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      20,
      38
    );
    doc.line(20, 42, 190, 42);

    // Section 1: Dashboard Stats
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("1. Overall Security Statistics", 20, 52);

    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    doc.text(`• Total Scans Completed: ${stats.total_scans}`, 25, 62);
    doc.text(`• Scans Logged Today: ${stats.scans_today}`, 25, 70);
    doc.text(`• Safe Links Classified: ${stats.safe}`, 25, 78);
    doc.text(`• Suspicious Links: ${stats.suspicious}`, 25, 86);
    doc.text(`• Malicious Detections: ${stats.malicious}`, 25, 94);
    doc.text(`• Registered Users Count: ${stats.total_users}`, 25, 102);
    doc.text(`• Users Online Now: ${stats.online_users}`, 25, 110);
    doc.text(`• Daily Visitors: ${stats.today_visitors}`, 25, 118);

    // Section 2: Top Countries
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("2. Geographic Analysis (Top Countries)", 20, 134);

    let y = 144;
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    if (topCountries.length === 0) {
      doc.text("No geographic scanning history found.", 25, y);
    } else {
      topCountries.slice(0, 5).forEach((c, idx) => {
        doc.text(`${idx + 1}. Country: ${c.country} - Scans: ${c.count}`, 25, y);
        y += 8;
      });
    }

    // New Page for logs
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("3. Recent Malicious URL Detection Summary", 20, 20);

    const maliciousRecent = recentScans.filter((s) =>
      isMalicious(s.classification)
    );

    y = 32;
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    if (maliciousRecent.length === 0) {
      doc.text("No recent malicious links captured.", 20, y);
    } else {
      maliciousRecent.slice(0, 15).forEach((s, idx) => {
        const truncatedUrl =
          s.url.length > 55 ? s.url.substring(0, 55) + "..." : s.url;
        doc.text(
          `${idx + 1}. [Score: ${s.threat_score}] URL: ${truncatedUrl} | IP: ${s.ip || "N/A"}`,
          20,
          y
        );
        y += 8;
      });
    }

    doc.save("LinkShield_Executive_Report.pdf");
    toast.success("PDF Report downloaded.");
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: Users,
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "Online Users",
      value: stats.online_users,
      icon: Activity,
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "Today's Visitors",
      value: stats.today_visitors,
      icon: UserCheck,
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Registered Users",
      value: stats.registered_users,
      icon: Users,
      color: "from-indigo-600 to-blue-600",
    },
    {
      title: "Inactive Users",
      value: stats.inactive_users,
      icon: UserX,
      color: "from-gray-600 to-slate-700",
    },
    {
      title: "Scans Today",
      value: stats.scans_today,
      icon: ScanSearch,
      color: "from-cyan-600 to-sky-600",
    },
    {
      title: "Safe URLs",
      value: stats.safe,
      icon: Shield,
      color: "from-green-600 to-lime-600",
    },
    {
      title: "Suspicious",
      value: stats.suspicious,
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Malicious",
      value: stats.malicious,
      icon: ShieldAlert,
      color: "from-red-600 to-pink-600",
    },
  ];

  const filteredScans = recentScans.filter(
    (s) =>
      s.url.toLowerCase().includes(scansSearch.toLowerCase()) ||
      (s.classification &&
        s.classification.toLowerCase().includes(scansSearch.toLowerCase()))
  );

  const filteredUsers = usersList.filter(
    (u) =>
      u.username.toLowerCase().includes(usersSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(usersSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <RefreshCw className="animate-spin text-green-400 mb-4" size={48} />
        <p className="text-lg font-medium">Loading Administrator Center...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      {/* Header Panel */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white flex items-center gap-3">
            👨‍💼 Admin Console
          </h1>
          <p className="text-green-400 text-lg mt-2 flex items-center gap-2">
            LinkShield AI Dashboard • Total Scans:{" "}
            <span className="font-bold underline">{stats.total_scans}</span>
            {refreshing && (
              <span className="text-xs text-slate-400 animate-pulse bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full">
                Auto-syncing...
              </span>
            )}
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => loadAllData(false)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold px-4 py-3 rounded-2xl transition"
            title="Manual sync database statistics"
          >
            <RefreshCw
              size={18}
              className={refreshing ? "animate-spin text-green-400" : ""}
            />
            Sync Now
          </button>

          <button
            onClick={exportCSVReport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-semibold px-5 py-3 rounded-2xl transition shadow-lg"
          >
            <Download size={18} />
            Export CSV
          </button>

          <button
            onClick={exportPDFReport}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 hover:scale-105 text-white font-semibold px-5 py-3 rounded-2xl transition shadow-lg"
          >
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="max-w-7xl mx-auto mb-8 border-b border-slate-850 flex gap-1 md:gap-2 overflow-x-auto whitespace-nowrap pb-2">
        {[
          { id: "overview", label: "📊 Overview" },
          { id: "scans", label: "🛡️ Recent Scans" },
          { id: "countries", label: "🌍 Geographicorigins" },
          { id: "users", label: "👥 Users & Logins" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-2xl font-bold text-sm md:text-base transition-all ${
              activeTab === tab.id
                ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tabs Container */}
      <div className="max-w-7xl mx-auto">
        {/* Tab 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-10 animate-fade-in">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${item.color} rounded-3xl p-6 shadow-xl flex items-center justify-between hover:scale-102 transition duration-300`}
                  >
                    <div>
                      <p className="text-white/80 text-sm md:text-base font-medium">
                        {item.title}
                      </p>
                      <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3">
                        {item.value}
                      </h2>
                    </div>
                    <Icon className="text-white/30" size={54} />
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ScanPieChart
                safe={stats.safe}
                suspicious={stats.suspicious}
                malicious={stats.malicious}
              />
              <ScanBarChart
                totalScans={stats.total_scans}
                scansToday={stats.scans_today}
              />
            </div>

            {/* Scan Trends AreaChart (Daily/Weekly/Monthly) */}
            <ScanTrendsChart trends={scanTrends} />
          </div>
        )}

        {/* Tab 2: RECENT SCANS */}
        {activeTab === "scans" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Recent Scan Logs</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Full list of URL scanning evaluations
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Filter URL or Classification..."
                  value={scansSearch}
                  onChange={(e) => setScansSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="bg-slate-800 text-slate-400 text-sm font-semibold uppercase">
                    <th className="p-4">URL Link</th>
                    <th className="p-4 text-center">Security Score</th>
                    <th className="p-4 text-center">Result Status</th>
                    <th className="p-4 text-center">Host Country</th>
                    <th className="p-4 text-center">IP Address</th>
                    <th className="p-4 text-center">Logged Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScans.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No recent scans found matching filters.
                      </td>
                    </tr>
                  ) : (
                    filteredScans.map((scan) => (
                      <tr
                        key={scan.id}
                        className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-4 font-mono text-sm text-blue-400 break-all max-w-xs">
                          {scan.url}
                        </td>
                        <td className="p-4 text-center text-lg font-bold">
                          {scan.threat_score}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                              scan.classification === "SAFE"
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : scan.classification === "SUSPICIOUS"
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            {scan.classification || "UNKNOWN"}
                          </span>
                        </td>
                        <td className="p-4 text-center text-slate-300">
                          {scan.country || "Unknown"}
                        </td>
                        <td className="p-4 text-center text-slate-400 font-mono text-xs">
                          {scan.ip || "N/A"}
                        </td>
                        <td className="p-4 text-center text-slate-400 text-sm">
                          {scan.scan_date}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: GEOGRAPHIC ANALYSIS */}
        {activeTab === "countries" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Scan Origins Geographic breakdown</h2>
            <p className="text-xs text-slate-400 mb-8">
              Distribution of server locations of investigated phishing/safe links
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Country List Progress Bars */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-green-400 mb-4 border-b border-slate-800 pb-2">
                  Top Country Sources
                </h3>
                {topCountries.length === 0 ? (
                  <p className="text-slate-500">No geo data captured yet.</p>
                ) : (
                  topCountries.map((c, i) => {
                    const maxCount = Math.max(
                      ...topCountries.map((x) => x.count),
                      1
                    );
                    const percentage = Math.round((c.count / maxCount) * 100);
                    return (
                      <div
                        key={i}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-slate-200 flex items-center gap-2">
                            <span className="text-slate-500">#{i + 1}</span>{" "}
                            {c.country}
                          </span>
                          <span className="text-slate-400 font-mono font-bold">
                            {c.count} scans
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                          <div
                            className="bg-green-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Geo Info Panel */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                <Globe size={48} className="text-green-500" />
                <h3 className="text-xl font-bold">Geo-intelligence Summary</h3>
                <p className="text-slate-400 text-sm leading-6">
                  This chart categorizes links inspected by LinkShield AI according to the country of
                  origin of their server IPs. By evaluating high-risk web hosting countries, the risk
                  engine flags domain hosting patterns that align with known malicious registrar zones.
                </p>
                <div className="pt-2">
                  <span className="text-xs text-slate-500 uppercase tracking-widest block font-bold">
                    Unique Locations Tracked
                  </span>
                  <span className="text-3xl font-extrabold text-white mt-1 block">
                    {topCountries.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: USERS & LOGIN LOGS */}
        {activeTab === "users" && (
          <div className="space-y-10 animate-fade-in">
            {/* Section 1: User Management List */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Registered User Accounts</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage active users registered in the system database
                  </p>
                </div>

                {/* User search */}
                <div className="relative w-full md:w-80">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search username or email..."
                    value={usersSearch}
                    onChange={(e) => setUsersSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full min-w-[800px] text-left">
                  <thead>
                    <tr className="bg-slate-800 text-slate-400 text-sm font-semibold uppercase">
                      <th className="p-4">Username</th>
                      <th className="p-4">Email Address</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Last Login Time</th>
                      <th className="p-4 text-center">Registered Date</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          No users found matching search.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="p-4 font-semibold text-slate-200">
                            {user.username}
                          </td>
                          <td className="p-4 text-slate-300 font-mono text-sm">
                            {user.email}
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                user.is_online
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : "bg-slate-800 text-slate-500 border border-slate-700"
                              }`}
                            >
                              {user.is_online ? "ONLINE" : "OFFLINE"}
                            </span>
                          </td>
                          <td className="p-4 text-center text-slate-400 text-sm">
                            {user.last_login || "Never"}
                          </td>
                          <td className="p-4 text-center text-slate-400 text-sm">
                            {user.created_at}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteUser(user.id, user.username)}
                              className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-xl border border-red-500/20 transition-all"
                              title="Delete User from Database"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Recent Logins Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-2">🕒 Recent Login Activity Logs</h2>
              <p className="text-xs text-slate-400 mb-6">
                Audit trail for the latest 10 successful user authentication attempts
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full min-w-[650px] text-left">
                  <thead>
                    <tr className="bg-slate-800 text-slate-400 text-sm font-semibold uppercase">
                      <th className="p-4">User</th>
                      <th className="p-4">Email</th>
                      <th className="p-4 text-center">Authentication Status</th>
                      <th className="p-4 text-center">Login Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLogins.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-500">
                          No recent login logs available.
                        </td>
                      </tr>
                    ) : (
                      recentLogins.map((login) => (
                        <tr
                          key={login.id}
                          className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="p-4 font-semibold text-slate-200">
                            {login.username}
                          </td>
                          <td className="p-4 text-slate-300 font-mono text-sm">
                            {login.email}
                          </td>
                          <td className="p-4 text-center">
                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold">
                              SUCCESS
                            </span>
                          </td>
                          <td className="p-4 text-center text-slate-400 font-mono text-sm">
                            {login.last_login}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;