import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerVendor } from "../../services/auth";
import AuthFormContainer from "../../components/common/Auth/AuthFormContainer";
import AuthInputField from "../../components/common/Auth/AuthInputField";
import AuthSubmitButton from "../../components/common/Auth/AuthSubmitButton";
import AuthFooter from "../../components/common/Auth/AuthFooter";
import AuthIcon from "../../components/common/Auth/AuthIcon";
import { setAuthToken, setUserData } from "../../utils/auth";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    company_name: "",
    address: "",
    phone: "",
    role: "vendor", // Default role
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("Changing:", e.target.name, e.target.value); // Add this
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await registerVendor(form);
      const { token, user, vendor } = response.data;

      // Now store them correctly
      setAuthToken(token);
      setUserData({ user, vendor });

      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const vendorIcon = (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  );

  return (
    <AuthFormContainer
      title="Vendor Registration"
      subtitle="Create your vendor account"
      icon={<AuthIcon icon={vendorIcon} />}
    >
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuthInputField
            label="Full Name"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />

          <AuthInputField
            label="Email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <AuthInputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
          minLength="8"
        />

        <AuthInputField
          label="Confirm Password"
          name="password_confirmation"
          type="password"
          placeholder="••••••••"
          value={form.password_confirmation}
          onChange={handleChange}
          required
          minLength="8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuthInputField
            label="Company Name"
            name="company_name"
            placeholder="Your Company LLC"
            value={form.company_name}
            onChange={handleChange}
            required
          />

          <AuthInputField
            label="Phone Number"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <AuthInputField
          label="Company Address"
          name="address"
          placeholder="123 Business St, City, Country"
          value={form.address}
          onChange={handleChange}
          required
        />

        <div className="pt-2">
          <AuthSubmitButton isSubmitting={isSubmitting}>
            Register as Vendor
          </AuthSubmitButton>
        </div>

        <AuthFooter
          text="Already have an account?"
          linkText="Sign in"
          linkUrl="/login"
        />
      </form>
    </AuthFormContainer>
  );
};

export default RegisterForm;
