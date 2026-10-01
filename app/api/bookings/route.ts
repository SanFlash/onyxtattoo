import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const bookingSchema = z.object({
  name:z.string().min(2).max(100),
  phone:z.string().min(7).max(30),
  email:z.string().email().optional().or(z.literal("")),
  service:z.string().min(2).max(100),
  description:z.string().min(5).max(3000),
  style:z.string().max(100).optional(),
  placement:z.string().max(100).optional(),
  size:z.string().max(100).optional(),
  preferredDate:z.string().optional(),
  preferredTime:z.string().max(30).optional(),
  artistId:z.string().optional()
});

export async function POST(request: Request) {
  try {
    const input = bookingSchema.parse(await request.json());
    const customer = await db.customer.create({
      data:{name:input.name, phone:input.phone, email:input.email || null}
    });
    const bookingNumber = "ONYX-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6);
    const booking = await db.booking.create({
      data:{
        bookingNumber, customerId:customer.id, artistId:input.artistId || null,
        service:input.service, description:input.description,
        style:input.style || null, placement:input.placement || null, size:input.size || null,
        preferredDate:input.preferredDate ? new Date(input.preferredDate) : null,
        preferredTime:input.preferredTime || null
      },
      select:{bookingNumber:true,status:true}
    });
    return NextResponse.json(booking,{status:201});
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({error:"Invalid booking data",details:error.flatten()},{status:400});
    console.error(error);
    return NextResponse.json({error:"Unable to create booking"},{status:500});
  }
}