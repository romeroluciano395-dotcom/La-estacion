"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { contactSchema, type ContactInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactInput) {
    // Simula el envío. Reemplazar por POST a /api/contacto.
    await new Promise((r) => setTimeout(r, 700));
    toast.success("¡Mensaje enviado!", {
      description: "Te vamos a responder a la brevedad.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="¿En qué te podemos ayudar?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="accent"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Enviando..." : "Enviar mensaje"}
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
