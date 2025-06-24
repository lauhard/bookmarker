<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer class=" flex flex-row justify-between bg-base-300 text-white">
    <div class="container px-6 py-12 mx-auto text-center sm:text-left">
        <div class="sm:flex sm:justify-between sm:items-center">
            <div class="mb-6 sm:mb-0">
                <p class="text-xl font-bold text-primary">Bookmarker</p>
                <p class="text-sm text-base-content/70">
                    Deine digitale Bibliothek.
                </p>
            </div>
            <div class="flex justify-center gap-x-6">
                <a
                    href="https://github.com/lauhard/bookmarker"
                    target="_blank"
                    class="hover:text-primary text-base-content/70 transition-colors"
                    >GitHub</a
                >
                <a
                    href="/legal-notice"
                    class="hover:text-primary text-base-content/70 transition-colors"
                    >Legal Notice</a
                >
                <a
                    href="/privacy"
                    class="hover:text-primary text-base-content/70 transition-colors"
                    >Privacy</a
                >
            </div>
        </div>
        <hr class="my-6 border-base-content/20" />
        <p class="text-center text-sm text-base-content/70">
            © {currentYear} Bookmarker. Veröffentlicht unter der MIT-Lizenz.
        </p>
    </div>
</footer>
