import { Link } from "react-router-dom";
import {
  FaDumbbell,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}

      <nav className="bg-white shadow-md">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-blue-700">
            GymFlow
          </h1>

          <div className="space-x-4">

            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </Link>

          </div>

        </div>

      </nav>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">

        <div>

          <h2 className="text-5xl font-bold leading-tight">

            Modern Gym
            <span className="text-blue-600">
              {" "}Management
            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-600">

            Manage members, attendance,
            subscriptions, payments,
            reports and much more
            from one dashboard.

          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50"
            >
              Login
            </Link>

          </div>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900"
            alt="Gym"
            className="rounded-3xl shadow-xl"
          />

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-bold text-center mb-12">

          Features

        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <FaUsers className="text-5xl text-blue-600 mx-auto mb-4" />

            <h3 className="font-bold text-xl">

              Members

            </h3>

            <p className="mt-3 text-gray-500">

              Manage unlimited gym members.

            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <FaMoneyBillWave className="text-5xl text-green-600 mx-auto mb-4" />

            <h3 className="font-bold text-xl">

              Payments

            </h3>

            <p className="mt-3 text-gray-500">

              Track every payment instantly.

            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <FaChartLine className="text-5xl text-purple-600 mx-auto mb-4" />

            <h3 className="font-bold text-xl">

              Reports

            </h3>

            <p className="mt-3 text-gray-500">

              Beautiful dashboard analytics.

            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <FaDumbbell className="text-5xl text-orange-500 mx-auto mb-4" />

            <h3 className="font-bold text-xl">

              Membership

            </h3>

            <p className="mt-3 text-gray-500">

              Flexible membership plans.

            </p>

          </div>

        </div>

      </section>
      {/* Pricing */}

<section className="bg-white py-20">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-4">
      Simple Pricing
    </h2>

    <p className="text-center text-gray-500 mb-12">
      Choose the perfect plan for your gym business.
    </p>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="border rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">

        <h3 className="text-2xl font-bold">
          Starter
        </h3>

        <p className="text-5xl font-bold my-6">
          ₹999
        </p>

        <p className="text-gray-500 mb-6">
          / Month
        </p>

        <ul className="space-y-3 text-gray-600">

          <li>✔ 100 Members</li>
          <li>✔ Attendance</li>
          <li>✔ Payments</li>
          <li>✔ Reports</li>

        </ul>

      </div>

      <div className="border-2 border-blue-600 rounded-2xl shadow-2xl p-8 text-center scale-105">

        <h3 className="text-2xl font-bold text-blue-600">
          Professional
        </h3>

        <p className="text-5xl font-bold my-6">
          ₹1999
        </p>

        <p className="text-gray-500 mb-6">
          / Month
        </p>

        <ul className="space-y-3 text-gray-600">

          <li>✔ Unlimited Members</li>
          <li>✔ Attendance</li>
          <li>✔ Payments</li>
          <li>✔ Reports</li>
          <li>✔ Analytics</li>

        </ul>

      </div>

      <div className="border rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">

        <h3 className="text-2xl font-bold">
          Enterprise
        </h3>

        <p className="text-5xl font-bold my-6">
          Custom
        </p>

        <p className="text-gray-500 mb-6">
          Contact Us
        </p>

        <ul className="space-y-3 text-gray-600">

          <li>✔ Multi Branch</li>
          <li>✔ Unlimited Users</li>
          <li>✔ Priority Support</li>
          <li>✔ Custom Features</li>

        </ul>

      </div>

    </div>

  </div>

</section>
{/* About */}

<section className="py-20 bg-slate-50">

  <div className="max-w-7xl mx-auto px-6 text-center">

    <h2 className="text-4xl font-bold mb-6">
      Why GymFlow?
    </h2>

    <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-8">

      GymFlow is a complete cloud-based Gym Management System
      designed to simplify your daily operations.
      Manage memberships, attendance, subscriptions,
      payments and reports from one beautiful dashboard.

    </p>

  </div>

</section>

{/* Contact */}

<section className="py-20 bg-white">

  <div className="max-w-5xl mx-auto px-6 text-center">

    <h2 className="text-4xl font-bold mb-5">
      Contact Us
    </h2>

    <p className="text-gray-600 mb-10">

      Need a demo or custom pricing?
      Our team is ready to help.

    </p>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="shadow-lg rounded-2xl p-8">

        <h3 className="font-bold text-xl mb-3">
          📧 Email
        </h3>

        <p className="text-gray-600">
          support@gymflow.com
        </p>

      </div>

      <div className="shadow-lg rounded-2xl p-8">

        <h3 className="font-bold text-xl mb-3">
          📞 Phone
        </h3>

        <p className="text-gray-600">
          +91 98765 43210
        </p>

      </div>

      <div className="shadow-lg rounded-2xl p-8">

        <h3 className="font-bold text-xl mb-3">
          📍 Location
        </h3>

        <p className="text-gray-600">
          Bangalore, India
        </p>

      </div>

    </div>

  </div>

</section>

{/* Footer */}

<footer className="bg-slate-900 text-white py-12">

  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

    <div>

      <h2 className="text-3xl font-bold">
        GymFlow
      </h2>

      <p className="text-gray-400 mt-2">

        Smart Gym Management Software

      </p>

    </div>

    <div className="flex gap-8 mt-6 md:mt-0">

      <Link to="/" className="hover:text-blue-400">
        Home
      </Link>

      <Link to="/login" className="hover:text-blue-400">
        Login
      </Link>

      <Link to="/register" className="hover:text-blue-400">
        Register
      </Link>

    </div>

  </div>

  <div className="text-center text-gray-500 mt-10">

    © 2026 GymFlow. All Rights Reserved.

  </div>

</footer>
      {/* Footer */}

      <footer className="bg-slate-900 text-white py-10 text-center">

        <h2 className="text-2xl font-bold">

          GymFlow

        </h2>

        <p className="mt-3 text-slate-300">

          © 2026 GymFlow. All Rights Reserved.

        </p>

      </footer>

    </div>
  );
}