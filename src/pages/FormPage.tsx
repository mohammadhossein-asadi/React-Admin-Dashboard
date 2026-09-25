import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function FormPage() {
  const { t } = useTranslation();

  const formSchema = z.object({
    firstName: z.string().min(1, t("First name is required")),
    lastName: z.string().min(1, t("Last name is required")),
    email: z.email(t("Invalid email address")),
    contact: z.string().min(1, t("Contact number is required")),
    address1: z.string().min(1, t("Address is required")),
    address2: z.string().min(1, t("Address is required")),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      address1: "",
      address2: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    setSubmitted(true);
    reset();
  };

  return (
    <div className="space-y-6">
      <Header subtitle={t("Create a New User Profile")} />
      <Card>
        <CardContent className="pt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="firstName">{t("First Name")}</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="lastName">{t("Last Name")}</Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-4">
              <Label htmlFor="email">{t("Email")}</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-4">
              <Label htmlFor="contact">{t("Contact Number")}</Label>
              <Input id="contact" {...register("contact")} />
              {errors.contact && (
                <p className="text-sm text-destructive">{errors.contact.message}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-4">
              <Label htmlFor="address1">{t("Address 1")}</Label>
              <Input id="address1" {...register("address1")} />
              {errors.address1 && (
                <p className="text-sm text-destructive">{errors.address1.message}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-4">
              <Label htmlFor="address2">{t("Address 2")}</Label>
              <Input id="address2" {...register("address2")} />
              {errors.address2 && (
                <p className="text-sm text-destructive">{errors.address2.message}</p>
              )}
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
              {submitted && (
                <p className="mr-4 self-center text-sm font-medium text-success">
                  {t("User created successfully!")}
                </p>
              )}
              <Button type="submit">{t("Create New User")}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
