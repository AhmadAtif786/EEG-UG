import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Transporter einrichten (hier z.B. Gmail oder SMTP Server nutzen)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // oder dein SMTP Server
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // deine Absender-Email
        pass: process.env.EMAIL_PASS, // App-Passwort oder SMTP-Passwort
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: "example@example.com", // Empfänger
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error:any) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
