<script lang="ts">
    // ... dein gesamter <script> Block bleibt unverändert ...
    import { getUserState } from "$lib/state/user.svelte";
    import IntersectionObserver from "svelte-intersection-observer";

    const currentYear = new Date().getFullYear();
    const heroFeatures = ["Create", "Organize", "Find", "Share"];
    const features = [
        {
            name: "Create",
            icon: "📝",
            description:
                "Speichere Links von jeder beliebigen Seite mit nur einem Klick. Füge Notizen und Tags hinzu, um alles im Kontext zu behalten.",
        },
        {
            name: "Organize",
            icon: "🗂️",
            description:
                "Erstelle verschachtelbare Ordner und Sammlungen. Unser System hilft dir dabei, auch tausende von Links mühelos zu sortieren.",
        },
        {
            name: "Find",
            icon: "🔍",
            description:
                "Eine blitzschnelle Volltextsuche durchsucht Titel, URLs und sogar den Inhalt deiner gespeicherten Seiten.",
        },
        {
            name: "Share",
            icon: "🔗",
            description:
                "Mache deine Collections öffentlich oder teile sie privat mit Freunden.",
        },
    ];
    const faqs = [
        {
            q: "Ist Bookmarker wirklich komplett kostenlos?",
            a: "Ja, die Kernfunktionen von Bookmarker sind und bleiben kostenlos. Wir planen eventuell zukünftige Premium-Features für Power-Nutzer, aber die Basisversion wird immer gratis sein.",
        },
        {
            q: "Kann ich meine Lesezeichen aus dem Browser importieren?",
            a: "Diese Funktion ist derzeit in Arbeit und wird bald verfügbar sein.",
        },
        {
            q: "Auf welchen Geräten kann ich Bookmarker nutzen?",
            a: "Bookmarker ist eine Web-App und läuft auf jedem Gerät mit einem modernen Browser – egal ob Desktop, Tablet oder Smartphone.",
        },
    ];
    const testimonials = [
        {
            name: "Markus T.",
            role: "Entwickler",
            quote: "Als Entwickler habe ich hunderte von Links zu Dokumentationen und Artikeln. Die Suchfunktion von Bookmarker ist blitzschnell und spart mir täglich Zeit.",
        },
    ];

    let featuresSection: HTMLElement;
    let featureDivs: HTMLElement;
    let openSourceSection: HTMLElement;
    let faqSection: HTMLElement;
    let ctaSection: HTMLElement;
</script>

<div class="absolute top-0 left-0 -z-10 w-full h-full overflow-hidden">
    <div
        class="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-accent/20 rounded-full filter blur-3xl opacity-40"
    ></div>
    <div
        class="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-3xl opacity-40"
    ></div>
</div>

<section
    class="relative flex-grow flex items-center justify-center text-center py-20 sm:py-28 overflow-hidden"
>
    <div class="container px-6 mx-auto">
        <h1
            class="text-5xl sm:text-6xl lg:text-8xl font-extrabold uppercase tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in-up"
            style="animation-delay: 100ms;"
        >
            <span class="inline-flex items-center gap-2"
                >Book<svg
                    class="inline w-[1em] h-[1em] align-middle text-primary"
                    height="auto"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M16 4H24L32 14L40 4H48C50.2091 4 52 5.79086 52 8V56L33 46L12 60V8C12 5.79086 13.7909 4 16 4Z"
                        fill="currentColor"
                    /></svg
                >arker</span
            >
        </h1>
        <div
            class="mt-6 flex flex-wrap justify-center items-center gap-3 sm:gap-4"
        >
            {#each heroFeatures as feature, i}
                <span
                    class="font-semibold text-sm sm:text-base text-accent bg-accent/10 px-4 py-1.5 rounded-full animate-fade-in-up"
                    style="animation-delay: {300 + i * 100}ms;">{feature}</span
                >
            {/each}
        </div>
        <p
            class="mt-8 text-base sm:text-lg lg:text-xl font-medium text-base-content/60 animate-fade-in-up"
            style="animation-delay: 800ms;"
        >
            The last bookmark manager you'll ever need.
        </p>
        <p
            class="mt-2 text-base sm:text-lg lg:text-xl font-light text-base-content/60 animate-fade-in-up"
            style="animation-delay: 900ms;"
        >
            A free bookmark manager for everyone. Nothing more.
        </p>

        <div
            class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style="animation-delay: 1000ms;"
        >
            <a
                href="/login"
                class="btn btn-lg btn-wide text-white font-bold bg-gradient-to-r from-primary to-accent border-none shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
                Get Started
            </a>
            <a
                href="https://github.com/dein-repo"
                target="_blank"
                class="btn btn-outline btn-lg btn-wide"
            >
                Star on GitHub
            </a>
        </div>
    </div>
</section>

<IntersectionObserver
    element={featuresSection}
    let:intersecting
    once={true}
    threshold={0.2}
>
    <section
        id="features"
        class="py-20 sm:py-28 bg-slate-50"
        bind:this={featuresSection}
    >
        <div class="container px-6 mx-auto">
            <div
                class="text-center max-w-3xl mx-auto scroll-target"
                class:animate-in={intersecting}
            >
                <h2 class="text-3xl sm:text-4xl font-bold text-primary">
                    Alles, was du brauchst. Nichts, was du nicht brauchst.
                </h2>
                <p class="mt-4 text-lg text-slate-600">
                    Bookmarker wurde entwickelt, um leistungsstark und
                    gleichzeitig intuitiv zu sein. Konzentriere dich auf das
                    Wesentliche: deine Inhalte.
                </p>
            </div>
            <IntersectionObserver
                element={featureDivs}
                let:intersecting
                threshold={0.2}
                once={true}
            >
                <div
                    bind:this={featureDivs}
                    class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {#each features as feature, i}
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg scroll-target"
                            class:animate-in={intersecting}
                            style="transition-delay: {i * 100}ms;"
                        >
                            <div
                                class="flex flex-col items-center gap-4 text-accent"
                            >
                                <div
                                    class="flex items-center justify-center w-16 h-16 rounded-full border-2 border-current bg-accent/10"
                                >
                                    {@html feature.icon}
                                </div>
                                <h3
                                    class="font-semibold text-xl tracking-wide uppercase"
                                >
                                    {feature.name}
                                </h3>
                            </div>
                            <p class="mt-4 text-slate-500">
                                {feature.description}
                            </p>
                        </div>
                    {/each}
                </div>
            </IntersectionObserver>
        </div>
    </section>
</IntersectionObserver>

<IntersectionObserver
    element={openSourceSection}
    let:intersecting
    once={true}
    threshold={0.2}
>
    <section class="py-20 sm:py-28 bg-white" bind:this={openSourceSection}>
        <div class="container px-6 mx-auto">
            <div
                class="text-center max-w-3xl mx-auto scroll-target"
                class:animate-in={intersecting}
            >
                <h2 class="text-3xl sm:text-4xl font-bold text-primary">
                    Offen. Transparent. Für dich gebaut.
                </h2>
                <p class="mt-4 text-lg text-slate-600">
                    Bookmarker ist ein unabhängiges Open-Source-Projekt ohne
                    versteckte Kosten oder Datenverkauf. Wir glauben an
                    Datenschutz und faire Software.
                </p>
            </div>
            <div
                class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
                <div
                    class="p-6 bg-slate-50 rounded-xl shadow-sm hover:shadow-md scroll-target"
                    class:animate-in={intersecting}
                    style="transition-delay: 0ms;"
                >
                    <div class="text-4xl mb-4">🔒</div>
                    <h3 class="text-xl font-semibold text-primary">
                        Datenschutz zuerst
                    </h3>
                    <p class="mt-2 text-slate-600">
                        Deine Lesezeichen gehören dir. Wir speichern nur das,
                        was du brauchst – ohne Tracker, Werbung oder Analytics.
                    </p>
                </div>
                <div
                    class="p-6 bg-slate-50 rounded-xl shadow-sm hover:shadow-md scroll-target"
                    class:animate-in={intersecting}
                    style="transition-delay: 150ms;"
                >
                    <div class="text-4xl mb-4">🧩</div>
                    <h3 class="text-xl font-semibold text-primary">
                        100 % Open Source
                    </h3>
                    <p class="mt-2 text-slate-600">
                        Der gesamte Code ist öffentlich einsehbar. Du kannst ihn
                        nutzen, ändern, verbessern – ganz ohne Lock-in.
                    </p>
                </div>
                <div
                    class="p-6 bg-slate-50 rounded-xl shadow-sm hover:shadow-md scroll-target"
                    class:animate-in={intersecting}
                    style="transition-delay: 300ms;"
                >
                    <div class="text-4xl mb-4">🚫</div>
                    <h3 class="text-xl font-semibold text-primary">
                        Keine Dark Patterns
                    </h3>
                    <p class="mt-2 text-slate-600">
                        Keine Abo-Fallen, keine versteckten Popups. Bookmarker
                        ist einfach, ehrlich und auf dein Nutzererlebnis
                        fokussiert.
                    </p>
                </div>
            </div>
        </div>
    </section>
</IntersectionObserver>

<IntersectionObserver
    element={faqSection}
    let:intersecting
    once={true}
    threshold={0.2}
>
    <section class="py-20 sm:py-28 bg-slate-50" bind:this={faqSection}>
        <div class="container px-6 mx-auto max-w-3xl">
            <div
                class="text-center scroll-target"
                class:animate-in={intersecting}
            >
                <h2 class="text-3xl sm:text-4xl font-bold text-primary">
                    Häufig gestellte Fragen
                </h2>
                <p class="mt-4 text-lg text-slate-600">
                    Noch Fragen? Hier findest du die Antworten.
                </p>
            </div>
            <div class="mt-12 space-y-4">
                {#each faqs as faq, i}
                    <details
                        class="p-6 bg-white rounded-lg shadow-sm cursor-pointer group scroll-target"
                        class:animate-in={intersecting}
                        style="transition-delay: {i * 100}ms;"
                    >
                        <summary
                            class="flex justify-between items-center font-semibold text-primary list-none"
                        >
                            {faq.q}
                            <div
                                class="transition-transform duration-300 group-open:rotate-180"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><path d="m6 9 6 6 6-6" /></svg
                                >
                            </div>
                        </summary>
                        <p class="mt-4 text-slate-600">{faq.a}</p>
                    </details>
                {/each}
            </div>
        </div>
    </section>
</IntersectionObserver>

<IntersectionObserver
    element={ctaSection}
    let:intersecting
    once={true}
    threshold={0.2}
>
    <section class="py-20 sm:py-28" bind:this={ctaSection}>
        <div
            class="container px-6 mx-auto text-center scroll-target"
            class:animate-in={intersecting}
        >
            <h2 class="text-3xl sm:text-4xl font-bold text-primary">
                Bereit, die Kontrolle zu übernehmen?
            </h2>
            <p class="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
                Erstelle in weniger als einer Minute dein kostenloses Konto und
                sag dem Lesezeichen-Chaos Lebewohl.
            </p>
            <div class="mt-8">
                <a
                    href="/login"
                    class="btn btn-primary btn-lg btn-wide shadow-lg hover:shadow-xl transition-shadow"
                >
                    Jetzt kostenlos starten
                </a>
            </div>
        </div>
    </section>
</IntersectionObserver>

<style lang="postcss">
    /* Die initiale Animation für den sichtbaren Hero-Bereich */
    @keyframes fade-in-up {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
        opacity: 0;
    }

    /* NEU: CSS für unsere Scroll-Animationen mit eindeutiger Klasse */
    :global(.scroll-target) {
        opacity: 0;
        transform: translateY(50px);
        /* Die Transition wird jetzt hier definiert, damit sie immer gilt */
        transition:
            opacity 0.7s ease-out,
            transform 0.7s ease-out;
    }

    :global(.animate-in) {
        opacity: 1;
        transform: translateY(0);
    }

    /* Versteckt den Pfeil bei <details> für ein sauberes Look&Feel */
    details > summary {
        list-style: none;
    }
    details > summary::-webkit-details-marker {
        display: none;
    }
</style>
