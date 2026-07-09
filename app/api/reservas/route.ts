import { NextResponse } from "next/server";

import { reservationSchema } from "@/lib/validations";
import { createReservation, getReservations } from "@/services/reservations.service";
import { createPreference } from "@/lib/mercadopago";

export async function GET() {
  const reservations = await getReservations();
  return NextResponse.json({ reservations });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = reservationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const reservation = await createReservation(parsed.data);

  const preference = await createPreference(
    [
      {
        title: reservation.tripTitle,
        quantity: reservation.seats,
        unitPrice: reservation.amount / reservation.seats,
      },
    ],
    { reservationCode: reservation.code },
  );

  return NextResponse.json(
    { reservation, checkoutUrl: preference.initPoint },
    { status: 201 },
  );
}
