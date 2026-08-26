import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "rhino_crm_gate";

function ownerPin(): string {
  return (process.env.CRM_PIN ?? "RHINO").trim();
}

function gateToken(): string {
  return createHmac("sha256", ownerPin()).update("rhino-crm-gate").digest("hex");
}

function readCookie(request: Request, name: string): string {
  const raw = request.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    const key = part.slice(0, i).trim();
    if (key === name) {
      try {
        return decodeURIComponent(part.slice(i + 1).trim());
      } catch {
        return part.slice(i + 1).trim();
      }
    }
  }
  return "";
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** True when the submitted PIN matches the owner pin. */
export function verifyCrmPin(candidate: string): boolean {
  return safeEqual(candidate.trim(), ownerPin());
}

/** 401 JSON when the httpOnly owner cookie is missing or wrong. */
export function crmGateDenied(request: Request): Response | null {
  if (safeEqual(readCookie(request, COOKIE), gateToken())) return null;
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export function setCrmGateCookie(headers: Headers): void {
  headers.append(
    "Set-Cookie",
    `${COOKIE}=${gateToken()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
  );
}
