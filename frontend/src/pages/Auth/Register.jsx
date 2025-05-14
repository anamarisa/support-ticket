import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { register as registerService } from "@/services/authService";
import { setAuthToken, setUserData } from "@/lib/auth";
import brand from "@/assets/images/brand1.webp";
import logo from "@/assets/images/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  password_confirmation: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await registerService(values);

      setAuthToken(response.token);
      setUserData(response.user);

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      form.setError("email", {
        type: "manual",
        message: "An error occurred during registration. Please try again.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-white flex lg:flex-row">
      {/* Brand Image - Hidden on mobile, shown on desktop with max-width and flexible height */}
      <div className="hidden sm:hidden lg:flex lg:w-3/4 h-screen relative">
        <img src={brand} alt="brand" className="w-full h-full object-cover" />
        <div className="absolute top-6 left-6 z-10">
          <img src={logo} alt="logo" className="w-70"></img>
        </div>
      </div>

      {/* Form Container */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <div className="absolute top-6 left-6 z-10 block lg:hidden">
          <img src={logo} alt="Logo" className="w-35" />
        </div>

        <div className="absolute top-6 right-6 z-10">
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <h2 className="text-2xl font-bold mb-10 sm:mb-6 text-center sm:text-left">
                Create Account
              </h2>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-200 rounded-md h-9"
                        type="text"
                        placeholder="Your Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-200 rounded-md h-9"
                        type="email"
                        placeholder="name@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-200 rounded-md h-9"
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-200 rounded-md h-9"
                        type="password"
                        placeholder="Re-enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-2 h-10 bg-[#142946] text-white"
                type="submit"
              >
                Register
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>By clicking continue, you agree to our</p>
            <p>
              <a href="#" className="font-medium underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
