import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router";
import { setAuthToken, setUserData } from "@/lib/auth";
import { login as loginService } from "@/services/authService";
import brand2 from "@/assets/images/brand2.webp";
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
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await loginService(values);
      setAuthToken(response.token);
      setUserData(response.user);
      navigate("/"); // redirect after login
    } catch (error) {
      console.error("Login failed:", error);
      form.setError("email", {
        type: "manual",
        message: "Invalid credentials.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-white flex lg:flex-row items-center justify-center">
      <div className="absolute top-6 left-6 z-10 block lg:hidden">
        <img src={logo} alt="Logo" className="w-35" />
      </div>

      <div className="absolute top-6 right-6 z-10">
        <Link to="/register">
          <Button variant="secondary">Sign up</Button>
        </Link>
      </div>

      {/* Brand Image - Hidden on mobile, shown on desktop with max-width and flexible height */}
      <div className="hidden sm:hidden lg:flex lg:w-3/4 h-screen relative">
        <img src={brand2} alt="brand" className="w-full h-full object-cover" />
        <div className="absolute top-6 left-6 z-10">
          <img src={logo} alt="logo" className="w-70"></img>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-[400px]">
          {/* Form */}{" "}
          <div className="space-y-6">
            <div className="space-y-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-bold mb-10 sm:mb-6 text-center sm:text-left">
                    Login to Leadsensei
                  </h2>

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

                  <Button
                    className="w-full mt-2 h-10 bg-[#142946] text-white"
                    type="submit"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>
            </div>
          </div>
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

export default Login;
