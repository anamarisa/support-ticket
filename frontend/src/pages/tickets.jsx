import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTicket } from "@/hooks/useCreateTicket";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters.",
    })
    .max(255, {
      message: "Description must not be more than 255 characters.",
    }),
  status: z.enum(["open", "in_progress", "closed"], {
    required_error: "Status is required",
  }),
});

export default function Tickets() {
  const { mutate: submitTicket, isPending } = useCreateTicket();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
    },
  });

  return (
    <div className="bg-gray-50 p-6 min-h-[calc(100vh-4rem)]">
      <div className="max-w-2xl bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Ticket</h2>
        <p className="text-gray-600 mb-6">
          Fill out the form to submit a new support ticket
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => submitTicket(values))}
            className="space-y-6"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter ticket title"
                      className="h-11 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe the issue or request..."
                      className="min-h-[120px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex pt-2">
              <Button
                type="submit"
                className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
