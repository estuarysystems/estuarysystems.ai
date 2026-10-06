import { site } from "@/lib/content";

/** "+14155550100" -> "(415) 555-0100". Other formats are shown as given. */
export function formatPhone(e164: string): string {
  const m = e164.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : e164;
}

type PhoneCtaProps = {
  className?: string;
};

const E164 = /^\+[1-9]\d{7,14}$/;

/** True only for a valid E.164 number with the verified flag set. */
export function voiceLineEnabled(number: string, verified: boolean): boolean {
  return verified && E164.test(number.trim());
}

/** Tap-to-call link. Hidden unless site.voiceNumber is valid E.164 AND site.voiceVerified is true. */
export function PhoneCta({ className = "" }: PhoneCtaProps) {
  const number = site.voiceNumber.trim();
  if (!voiceLineEnabled(number, site.voiceVerified)) return null;
  return (
    <p className={`text-sm text-muted ${className}`.trim()}>
      <span>{site.voiceLabel}: </span>
      <a
        href={`tel:${number}`}
        className="font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:text-signal"
      >
        {formatPhone(number)}
      </a>
    </p>
  );
}
