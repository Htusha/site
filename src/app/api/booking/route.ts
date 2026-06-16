const FORMAT_LABELS: Record<string, string> = {
  online: "Онлайн (Zoom)",
  offline: "Очно (Olivos, Буэнос-Айрес)",
  any: "Пока не знаю",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildMessage(data: {
  name: string;
  contact: string;
  format: string;
  message?: string;
}): string {
  const lines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Контакт:</b> ${escapeHtml(data.contact)}`,
    `<b>Формат:</b> ${escapeHtml(FORMAT_LABELS[data.format] ?? data.format)}`,
  ];

  if (data.message?.trim()) {
    lines.push("", `<b>Запрос:</b> ${escapeHtml(data.message.trim())}`);
  }

  return lines.join("\n");
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return Response.json(
      { error: "Telegram не настроен на сервере" },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Некорректные данные" }, { status: 400 });
  }

  const { name, contact, format, message } = body as {
    name?: string;
    contact?: string;
    format?: string;
    message?: string;
  };

  if (!name?.trim() || !contact?.trim() || !format) {
    return Response.json(
      { error: "Заполните имя, контакт и формат" },
      { status: 400 },
    );
  }

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildMessage({
          name: name.trim(),
          contact: contact.trim(),
          format,
          message,
        }),
        parse_mode: "HTML",
      }),
    },
  );

  if (!telegramResponse.ok) {
    return Response.json(
      { error: "Не удалось отправить заявку" },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
