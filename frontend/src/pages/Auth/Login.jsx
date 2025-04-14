import { useState } from "react";
import { useNavigate } from "react-router";
import { setAuthToken, setUserData } from "../../utils/auth";
import { login as loginService } from "../../services/auth";

import AuthFormContainer from "../../components/common/Auth/AuthFormContainer";
import AuthInputField from "../../components/common/Auth/AuthInputField";
import AuthSubmitButton from "../../components/common/Auth/AuthSubmitButton";
import AuthFooter from "../../components/common/Auth/AuthFooter";
import AuthIcon from "../../components/common/Auth/AuthIcon";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const data = await loginService({ email, password });
      console.log("Login data:", data);

      setAuthToken(data.token);
      setUserData({
        user: data.user,
        vendor: data.vendor,
      });

      if (data.user.role === "admin") {
        navigate("/vendor-approval");
      } else if (data.vendor?.status === "approved") {
        navigate("/");
      } else {
        navigate("/vendor-pending");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error details:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const lockIcon = (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  );

  return (
    <AuthFormContainer
      title="Welcome Back"
      subtitle="Sign in to your account"
      icon={<AuthIcon icon={lockIcon} />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}

        <AuthInputField
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInputField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showForgotPassword={true}
        />

        <AuthSubmitButton isSubmitting={isSubmitting}>Sign In</AuthSubmitButton>

        <AuthFooter
          text="Don't have an account?"
          linkText="Sign up"
          linkUrl="/register"
        />
      </form>
    </AuthFormContainer>
  );
};

export default Login;
