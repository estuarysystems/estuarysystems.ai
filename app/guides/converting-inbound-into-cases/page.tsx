import type { Metadata } from "next";
import Link from "next/link";
import { formatPhone } from "@/components/phone-cta";
import { site } from "@/lib/content";

const title = "Converting inbound calls into signed cases with AI";
const description =
  "A method for a small law firm. Answer each inbound call, collect intake data, open an intake portal, and follow up.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides/converting-inbound-into-cases",
  },
  openGraph: {
    title: `${title} · ${site.wordmark}`,
    description,
    url: "/guides/converting-inbound-into-cases",
    type: "article",
  },
};

const sections = [
  { href: "#section-1", label: "1. The situation" },
  { href: "#section-2", label: "2. The numbers to collect" },
  { href: "#section-3", label: "3. The method" },
  { href: "#section-4", label: "4. Example walkthrough" },
  { href: "#section-5", label: "5. Decisions a person still makes" },
  { href: "#section-6", label: "6. Implementation" },
] as const;

export default function InboundGuidePage() {
  const demoLabel = formatPhone(site.voiceNumber);

  return (
    <main id="main">
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="font-mono text-xs tracking-wide text-muted">
          <Link href="/guides" className="underline decoration-ink/20 underline-offset-4 hover:text-ink">
            Guides
          </Link>
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-pretty md:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-relaxed">
          Estuary Systems wrote this guide for law firms.
        </p>
        <p className="mt-3 text-lg leading-relaxed">
          You can read the method and use it without a sales call.
        </p>

        <nav className="mt-10 border border-line bg-slot px-5 py-5" aria-label="Sections">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Sections</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed">
            {sections.map((section) => (
              <li key={section.href}>
                <a
                  href={section.href}
                  className="underline decoration-ink/20 underline-offset-4 hover:text-signal"
                >
                  {section.label.replace(/^\d+\.\s/, "")}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="section-1" className="mt-14 scroll-mt-24" aria-labelledby="section-1-heading">
          <h2 id="section-1-heading" className="text-2xl font-medium tracking-tight text-pretty md:text-3xl">
            1. The situation
          </h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed">
            <p>This guide is for a small law firm.</p>
            <p>It fits personal injury work.</p>
            <p>It fits immigration work.</p>
            <p>It also fits other matters that start with a phone call.</p>
            <p>A lead is a person who contacts the firm and may sign.</p>
            <p>A client is a person the firm already represents.</p>
            <p>A signed case is a matter the firm agrees to take.</p>
            <p>A lead calls the firm.</p>
            <p>Staff may be busy.</p>
            <p>The office may be closed.</p>
            <p>If no one answers, the lead may not call again.</p>
            <p>The firm needs three results.</p>
          </div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed">
            <li>A person or an AI receptionist answers the call.</li>
            <li>The firm records the intake data.</li>
            <li>The firm follows up until the lead signs or the lead says no.</li>
          </ul>
        </section>

        <section id="section-2" className="mt-14 scroll-mt-24" aria-labelledby="section-2-heading">
          <h2 id="section-2-heading" className="text-2xl font-medium tracking-tight text-pretty md:text-3xl">
            2. The numbers to collect
          </h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed">
            <p>Collect these numbers before you change the process.</p>
            <p>Use the numbers from your firm.</p>
            <p>This guide gives the definitions. It does not give sample results.</p>
          </div>
          <ol className="mt-6 list-decimal space-y-6 pl-5 text-base leading-relaxed">
            <li>
              <h3 className="text-lg font-medium">Lead volume</h3>
              <p className="mt-2">Count the new leads in one week.</p>
            </li>
            <li>
              <h3 className="text-lg font-medium">Answer rate</h3>
              <p className="mt-2">An inbound call is a call a person makes to the firm.</p>
              <p className="mt-2">Count the calls that get an answer.</p>
              <p className="mt-2">Count the inbound calls.</p>
              <p className="mt-2">Divide the first number by the second number.</p>
              <p className="mt-2">This result is the answer rate.</p>
            </li>
            <li>
              <h3 className="text-lg font-medium">After-hours calls</h3>
              <p className="mt-2">An after-hours call is an inbound call when the office is closed.</p>
              <p className="mt-2">Count the after-hours calls in the same week.</p>
            </li>
            <li>
              <h3 className="text-lg font-medium">Response time</h3>
              <p className="mt-2">
                Response time is the time from the inbound call to the first reply from staff.
              </p>
              <p className="mt-2">Record this time for each new lead in the week.</p>
            </li>
            <li>
              <h3 className="text-lg font-medium">Contact rate</h3>
              <p className="mt-2">Count the leads your staff reach.</p>
              <p className="mt-2">Count the leads your staff try to reach.</p>
              <p className="mt-2">Divide the first number by the second number.</p>
              <p className="mt-2">This result is the contact rate.</p>
            </li>
            <li>
              <h3 className="text-lg font-medium">Consult booking rate</h3>
              <p className="mt-2">A consult is a meeting with the firm about the matter.</p>
              <p className="mt-2">Count the consults that the firm books.</p>
              <p className="mt-2">Count the leads.</p>
              <p className="mt-2">Divide the first number by the second number.</p>
              <p className="mt-2">This result is the consult booking rate.</p>
            </li>
            <li>
              <h3 className="text-lg font-medium">Sign rate</h3>
              <p className="mt-2">Count the signed cases.</p>
              <p className="mt-2">Count the leads.</p>
              <p className="mt-2">Divide the first number by the second number.</p>
              <p className="mt-2">This result is the sign rate.</p>
            </li>
            <li>
              <h3 className="text-lg font-medium">Follow-up coverage</h3>
              <p className="mt-2">Count the leads who receive every planned follow-up message.</p>
              <p className="mt-2">Count the leads who do not sign on the first call.</p>
              <p className="mt-2">Divide the first number by the second number.</p>
              <p className="mt-2">This result is the follow-up coverage.</p>
            </li>
          </ol>
          <div className="mt-6 space-y-3 text-base leading-relaxed">
            <p>Write the numbers down.</p>
            <p>Count them again after you change the process.</p>
            <p>Compare only the numbers from your firm.</p>
          </div>
        </section>

        <section id="section-3" className="mt-14 scroll-mt-24" aria-labelledby="section-3-heading">
          <h2 id="section-3-heading" className="text-2xl font-medium tracking-tight text-pretty md:text-3xl">
            3. The method
          </h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed">
            <p>The method has two parts.</p>
            <p>Part A is the AI receptionist.</p>
            <p>Part B is the intake portal.</p>
          </div>

          <section className="mt-10" aria-labelledby="method-a-heading">
            <h3 id="method-a-heading" className="text-xl font-medium tracking-tight text-pretty">
              A. AI receptionist for intake
            </h3>
            <div className="mt-4 space-y-3 text-base leading-relaxed">
              <p>The AI receptionist answers the phone.</p>
              <p>It answers 24 hours each day.</p>
              <p>It answers on every day of the week.</p>
              <p>It answers when staff are busy.</p>
              <p>It answers when the office is closed.</p>
              <p>Do not use a phone menu that tells the caller to press 1 or press 2.</p>
              <p>Route the call from the words of the caller.</p>
            </div>

            <h4 className="mt-8 text-lg font-medium">Intake data on the call</h4>
            <p className="mt-3 text-base leading-relaxed">Ask for these facts.</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
              <li>Name</li>
              <li>Phone or email</li>
              <li>Date of the incident, or the date the person needs help</li>
              <li>Type of incident or matter</li>
              <li>Injuries, if the matter is personal injury</li>
              <li>Insurance, if the caller has it</li>
              <li>How urgent the matter is</li>
              <li>Language of the caller</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed">Then give the call or the record to staff.</p>

            <h4 className="mt-8 text-lg font-medium">Guardrails</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
              <li>The receptionist does not give legal advice.</li>
              <li>The receptionist says that it is an AI.</li>
              <li>A person at the firm reviews the intake record.</li>
              <li>If the caller asks for legal advice, stop that answer and route the call to staff.</li>
              <li>If the caller asks about a conflict, staff do the conflict check.</li>
              <li>The receptionist does not clear a conflict.</li>
              <li>If the caller asks for a person, route the call to staff.</li>
              <li>If staff cannot take the call, take a message and the intake data.</li>
              <li>If the caller has an emergency, tell the caller to call emergency services.</li>
            </ul>

            <h4 className="mt-8 text-lg font-medium">Sample call-routing script</h4>
            <div className="mt-3 space-y-3 text-base leading-relaxed">
              <p>These words are an example.</p>
              <p>They are not a script for a named firm.</p>
            </div>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed">
              <li>
                &quot;You reached the law firm. I am an AI receptionist. I am not a lawyer. I cannot
                give legal advice.&quot;
              </li>
              <li>&quot;What is your name?&quot;</li>
              <li>&quot;What phone number or email can the firm use?&quot;</li>
              <li>&quot;What is the matter? For example, an injury or an immigration matter.&quot;</li>
              <li>&quot;When did this happen, or when do you need help?&quot;</li>
              <li>&quot;How urgent is this?&quot;</li>
              <li>&quot;Which language do you prefer?&quot;</li>
              <li>
                &quot;I will send this record to the firm. A person will review it. If this is an
                emergency, call emergency services now.&quot;
              </li>
            </ol>
            <p className="mt-6 text-base leading-relaxed">If the matter is a personal injury, add these questions.</p>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-base leading-relaxed">
              <li>&quot;What is the injury?&quot;</li>
              <li>&quot;Did you get medical care?&quot;</li>
              <li>&quot;Is there insurance? If yes, which insurance?&quot;</li>
            </ol>
            <p className="mt-6 text-base leading-relaxed">If the matter is immigration, add these questions.</p>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-base leading-relaxed">
              <li>&quot;What is the immigration matter?&quot;</li>
              <li>&quot;Is there a date or a deadline?&quot;</li>
            </ol>
            <p className="mt-4 text-base leading-relaxed">Do not tell the caller which form to file.</p>

            <h4 className="mt-8 text-lg font-medium">Route rules</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
              <li>New injury matter: collect the injury fields. Offer the intake portal. Tell the caller that staff will follow up.</li>
              <li>New immigration matter: collect the matter type, a deadline if the caller knows it, and the language. Do not name a form.</li>
              <li>Existing client: take the name and the reason for the call. Route the call to staff.</li>
              <li>Caller asks for legal advice: say that the AI receptionist cannot give legal advice. Offer a consult with a person.</li>
              <li>Caller asks for a person: route the call to staff. If staff cannot take the call, take a message and the intake data.</li>
            </ul>
          </section>

          <section className="mt-12" aria-labelledby="method-b-heading">
            <h3 id="method-b-heading" className="text-xl font-medium tracking-tight text-pretty">
              B. Build an intake portal
            </h3>
            <div className="mt-4 space-y-3 text-base leading-relaxed">
              <p>Build a secure form. This form is the intake portal.</p>
              <p>Only the lead and the firm can open the form for that lead.</p>
              <p>The AI receptionist puts the call data into the form before the lead opens it.</p>
              <p>The lead checks the fields.</p>
              <p>The lead can correct the fields.</p>
            </div>
            <h4 className="mt-8 text-lg font-medium">Uploads</h4>
            <p className="mt-3 text-base leading-relaxed">Let the lead upload these documents.</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
              <li>Photos</li>
              <li>Police report</li>
              <li>Medical bills</li>
            </ul>
            <h4 className="mt-8 text-lg font-medium">Status</h4>
            <p className="mt-3 text-base leading-relaxed">Show the lead a status. Use plain words.</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
              <li>Received</li>
              <li>In review</li>
              <li>Need a document</li>
              <li>Consult booked</li>
              <li>Signed</li>
              <li>Closed</li>
            </ul>
            <div className="mt-6 space-y-3 text-base leading-relaxed">
              <p>Send the completed record to the case management system.</p>
              <p>Some people say CRM for that system. This guide says case management system.</p>
              <p>Staff open that system to do the legal work.</p>
            </div>

            <h4 className="mt-8 text-lg font-medium">Follow-up when the lead does not sign</h4>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-base leading-relaxed">
              <li>On the day of the call, send the portal link and a short summary of the intake data.</li>
              <li>On the next day, send one reminder if the form is not complete.</li>
              <li>Three days after the call, call the lead or send a message. Ask if the lead wants a consult.</li>
              <li>Seven days after the call, send one last message. Ask the lead to reply yes or no.</li>
              <li>Stop when the lead says no.</li>
              <li>Stop when the lead does not reply after the last message.</li>
              <li>A person writes any message that gives a legal opinion. The AI receptionist does not write that message.</li>
            </ol>

            <h4 className="mt-8 text-lg font-medium">Checklist</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
              <li>Count the numbers in section 2.</li>
              <li>Write the call route.</li>
              <li>Include the words &quot;I am an AI.&quot;</li>
              <li>Include the words &quot;I cannot give legal advice.&quot;</li>
              <li>List the intake fields.</li>
              <li>Name the person who reviews each record.</li>
              <li>Name the person who does the conflict check.</li>
              <li>Open the intake portal with a test record.</li>
              <li>Confirm that the call data is in the form.</li>
              <li>Test one upload.</li>
              <li>Confirm that the record arrives in the case management system.</li>
              <li>Write the follow-up days.</li>
              <li>Tell staff what the AI receptionist does not do.</li>
            </ul>

            <h4 className="mt-8 text-lg font-medium">Sample intake fields</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
              <li>Full name</li>
              <li>Phone</li>
              <li>Email</li>
              <li>Preferred language</li>
              <li>City and state</li>
              <li>Matter type: personal injury, immigration, or other</li>
              <li>Incident date or deadline</li>
              <li>Short description of the matter</li>
              <li>Injuries</li>
              <li>Medical care so far</li>
              <li>Insurance company</li>
              <li>Police report: yes or no</li>
              <li>How the lead heard about the firm</li>
              <li>Urgency</li>
              <li>Best time for a call from staff</li>
              <li>Consent to contact the lead</li>
            </ul>
          </section>
        </section>

        <section id="section-4" className="mt-14 scroll-mt-24" aria-labelledby="section-4-heading">
          <h2 id="section-4-heading" className="text-2xl font-medium tracking-tight text-pretty md:text-3xl">
            4. Example walkthrough
          </h2>
          <p className="mt-4 border border-line bg-slot px-4 py-3 text-sm leading-relaxed">
            Example. This story is fiction. It is not a client. It is not a result.
          </p>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-relaxed">
            <li>A person calls a small personal-injury firm at 9 p.m. The office is closed.</li>
            <li>The AI receptionist answers.</li>
            <li>It says that it is an AI. It says that it cannot give legal advice.</li>
            <li>The caller gives a name, a phone number, the date of a car incident, and a short note about an injury.</li>
            <li>The receptionist does not say if the caller has a case.</li>
            <li>The receptionist sends a link to the intake portal.</li>
            <li>The form already shows the name, the phone number, and the incident date.</li>
            <li>The caller adds a photo and a medical bill.</li>
            <li>The status changes to received.</li>
            <li>The next morning, a person at the firm reads the record.</li>
            <li>That person does the conflict check.</li>
            <li>That person calls the lead and books a consult.</li>
            <li>This example stops before a signature. A person at the firm decides whether the firm takes the case.</li>
          </ol>
        </section>

        <section id="section-5" className="mt-14 scroll-mt-24" aria-labelledby="section-5-heading">
          <h2 id="section-5-heading" className="text-2xl font-medium tracking-tight text-pretty md:text-3xl">
            5. Decisions a person still makes
          </h2>
          <p className="mt-4 text-base leading-relaxed">A person at the law firm makes these decisions.</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed">
            <li>Accept or decline the matter.</li>
            <li>Do the conflict check.</li>
            <li>Give legal advice.</li>
            <li>Set the fee.</li>
            <li>Sign with the client.</li>
            <li>Decide which document is correct.</li>
            <li>Approve a message that states a legal position.</li>
            <li>Stop follow-up.</li>
          </ul>
          <div className="mt-4 space-y-3 text-base leading-relaxed">
            <p>The AI receptionist does not make these decisions.</p>
            <p>The intake portal does not make these decisions.</p>
          </div>
        </section>

        <section id="section-6" className="mt-14 scroll-mt-24" aria-labelledby="section-6-heading">
          <h2 id="section-6-heading" className="text-2xl font-medium tracking-tight text-pretty md:text-3xl">
            6. Implementation
          </h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed">
            <p>You can use this method with your own staff.</p>
            <p>Estuary Systems can build the AI receptionist and the intake portal with your firm.</p>
            <p>Estuary Systems works with a law firm on its intake.</p>
            <p>We do not put client names on this site.</p>
          </div>
          <div className="mt-6 flex flex-col items-start gap-4">
            <Link
              href={site.scheduleHref}
              className="inline-flex min-h-12 items-center justify-center bg-signal px-6 py-3 text-sm font-medium text-paper no-underline hover:bg-ink"
            >
              Book a call
            </Link>
            <p className="text-base leading-relaxed">
              Call{" "}
              <a
                href={`tel:${site.voiceNumber}`}
                className="font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:text-signal"
              >
                {demoLabel}
              </a>{" "}
              to hear an AI receptionist.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
