export async function sendLeadToSheets(payload: Record<string, unknown>) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return { ok: false, skipped: true };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    return { ok: response.ok, skipped: false };
  } catch {
    return { ok: false, skipped: false };
  } finally {
    clearTimeout(timeout);
  }
}
