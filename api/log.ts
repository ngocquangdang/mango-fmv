export default async function handler(req: any, res: any) {
  // Chỉ cho phép POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const logData = req.body;

    // Log ra Vercel server logs
    console.log(`[CLIENT LOG] [${logData.level?.toUpperCase() || "INFO"}]`, {
      timestamp: logData.timestamp,
      component: logData.component,
      message: logData.message,
      data: logData.data,
      userAgent: logData.userAgent,
      url: logData.url,
    });

    // Trả về success
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[LOG API ERROR]", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

