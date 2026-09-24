"use server";

import { Resend } from "resend";
import { z } from "zod";
import { ContactFormSchema } from "./schemas"; // assumes schema is defined in this file

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    };
  }

  try {
    const { name, email, message } = result.data;

    const { data: emailData, error } = await resend.emails.send({
      // Display name is the visitor's; the address must stay on a domain verified with Resend.
      from: `${name.replace(/[<>"\r\n]/g, "").trim()} <onboarding@resend.dev>`,
      to: "mvabhinand2005@gmail.com",
      replyTo: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
    });

    if (!emailData || error) {
      return {
        error: [{ field: "resend", message: error?.message || "Failed to send email." }],
      };
    }

    return { success: true };
  } catch (err) {
    return {
      error: [
        {
          field: "unknown",
          message: err instanceof Error ? err.message : "Unknown error occurred.",
        },
      ],
    };
  }
}
