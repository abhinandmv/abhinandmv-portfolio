"use client";

import { sendEmail } from "@/lib/actions";
import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import Link from "next/link";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await sendEmail(data);

    if (result.error) {
      toast.error("Failed to send. Please try again.");
      console.error(result.error);
      return;
    }

    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Name */}
        <div className="h-16">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="given-name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="h-16">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="h-32 sm:col-span-2">
          <Textarea
            rows={4}
            placeholder="Message"
            autoComplete="off"
            className="resize-none"
            {...register("message")}
          />
          {errors.message?.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>
      </div>

      <div className="mt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <span>Sending...</span>
              <ReloadIcon className="ml-2 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>Send Message</span>
              <PaperPlaneIcon className="ml-2" />
            </div>
          )}
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          By submitting this form, I agree to the{" "}
          <Link href="/privacy" className="link font-semibold">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
