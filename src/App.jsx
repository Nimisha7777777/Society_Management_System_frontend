import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH PAGES
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword";
import Home from "./Pages/Home";
import RegisterSociety from "./Pages/RegisterSociety/RegisterSociety";
import AboutUs from "./Pages/AboutUs";
import TakeDemo from "./Pages/TakeDemo";
import AdminParking from "./Pages/AdminDashboard/AdminParking";



// ADMIN DASHBOARDS
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import ApproveUsers from "./Pages/AdminDashboard/ApproveUsers";
import ManageFlats from "./Pages/AdminDashboard/ManageFlats";
// Maintenance
import MaintenanceSettings from "./Pages/Maintenance/MaintenanceSettings";
import MonthlyMaintenance from "./Pages/Maintenance/MonthlyMaintenance";


// RESIDENT DASHBOARDS
import MemberDashboard from "./Pages/MemberDashboard/MemberDashboard";

// MODULE PAGES
import Notices from "./Pages/Notices/Notices";
import AddNotices from "./Pages/Notices/AddNotices";

import Complaints from "./Pages/Complaints/Complaints";
import AddComplaints from "./Pages/Complaints/AddComplaints";

import Maintenance from "./Pages/Maintenance/Maintenance";

import MembersDirectory from "./Pages/MembersDirectory/MembersDirectory";

// AMENITIES
import AdminAmenities from "./Pages/Amenities/AdminAmenities/AdminAmenities";
import AdminBookings from "./Pages/Amenities/AdminAmenities/AdminBookings"; // ✅ ADDED
import ResidentAmenities from "./Pages/Amenities/ResidentAmenities";
import MyBookings from "./Pages/Amenities/MyBookings";

import Profile from "./Pages/Profile/Profile";


import ParkingList from "./Pages/parking/ParkingList";

import DocumentsList from "./Pages/documents/DocumentsList";
import UploadDocument from "./Pages/documents/UploadDocument"; 

import Notifications from "./Pages/notifications/Notifications";

/* ================= COMMON ================= */
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./Components/PrivateRoute";


import AdminVisitors from "./Pages/AdminVisitors";
/* ================= GUARD ================= */
import GuardDashboard from "./Pages/Guard/GuardDashboard";
import AddVisitorGuard from "./Pages/Guard/AddVisitor";
import InsideVisitors from "./Pages/Guard/InsideVisitors";
import TodayVisitors from "./Pages/Guard/TodayVisitors";


// ⭐ React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />        
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/demo" element={<TakeDemo />} />
        <Route path="/register-society" element={<RegisterSociety />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/admin/approve-users" element={<ApproveUsers />} />
        <Route path="/admin/manage-flats" element={<ManageFlats />} />


        <Route
          path="/admin/visitors"
          element={
            <PrivateRoute role="ADMIN">
              <AdminVisitors />
            </PrivateRoute>
          }
        />


        {/* MEMBER ROUTES */}
        <Route
          path="/member/dashboard"
          element={
            <PrivateRoute role="RESIDENT">
              <MemberDashboard />
            </PrivateRoute>
          }
        />


        {/* ================= GUARD ================= */}
        <Route
          path="/guard/dashboard"
          element={
            <PrivateRoute role="GUARD">
              <GuardDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/guard/add-visitor"
          element={
            <PrivateRoute role="GUARD">
              <AddVisitorGuard />
            </PrivateRoute>
          }
        />

        <Route
          path="/guard/inside-visitors"
          element={
            <PrivateRoute role="GUARD">
              <InsideVisitors />
            </PrivateRoute>
          }
        />

        <Route
          path="/guard/today-visitors"
          element={
            <PrivateRoute role="GUARD">
              <TodayVisitors />
            </PrivateRoute>
          }
        />

        
        
        <Route path="/admin/parking" element={<AdminParking />} />

        {/* NOTICES */}
        <Route path="/notices" element={<Notices />} />
        <Route path="/notices/add" element={<AddNotices />} />

        {/* COMPLAINTS */}
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/complaints/add" element={<AddComplaints />} />

        {/* MAINTENANCE */}
        <Route path="/maintenance" element={<Maintenance />} />
        {/* ADMIN MAINTENANCE */}
        <Route path="/maintenance/settings" element={<PrivateRoute role="ADMIN"> <MaintenanceSettings /> </PrivateRoute>} />
        <Route path="/maintenance/monthly" element={<PrivateRoute role="ADMIN"> <MonthlyMaintenance /> </PrivateRoute>} />


        {/* DIRECTORY */}
        <Route path="/directory" element={<MembersDirectory />} />

        {/* AMENITIES */}
        <Route
          path="/admin/amenities"
          element={
            <PrivateRoute role="ADMIN">
              <AdminAmenities />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <PrivateRoute role="ADMIN">
              <AdminBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/amenities"
          element={
            <PrivateRoute role="RESIDENT">
              <ResidentAmenities />
            </PrivateRoute>
          }
        />
        <Route
          path="/amenities/my-bookings"
          element={
            <PrivateRoute role="RESIDENT">
              <MyBookings />
            </PrivateRoute>
          }
        />

        {/* PROFILE */}
        <Route path="/profile" element={<Profile />} />

        {/* VISITORS
        <Route path="/visitors" element={<VisitorsList />} />
        <Route path="/visitors/add" element={<AddVisitor />} /> */}

        {/* PARKING */}
        <Route path="/parking" element={<ParkingList />} />

        {/* DOCUMENTS */}
        <Route path="/documents" element={<DocumentsList />} />
        <Route path="/documents/upload" element={<UploadDocument />} />

        {/* NOTIFICATIONS */}
        <Route path="/notifications" element={<Notifications />} />

        {/* ERROR PAGE */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>

      
      <ToastContainer position="top-center" autoClose={1800} pauseOnHover={false} />

    </BrowserRouter>
  );
}

export default App;
