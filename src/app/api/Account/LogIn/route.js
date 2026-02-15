import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const res = await axios.post(`${process.env.API_URL}/login/`, {
      username,
      password,
    });
    
    const { token, basket_count, primary_color, secondary_color } =
      res.data.data;

    const response = NextResponse.json({
      success: true,
      token,
      basket_count,
      primary_color,
      secondary_color,
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("basket_count", String(basket_count), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("primary_color", primary_color, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("secondary_color", secondary_color, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 401 },
    );
  }
}
