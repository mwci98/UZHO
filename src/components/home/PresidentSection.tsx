export function PresidentSection() {
  return (
<section className="py-16 bg-[#F6F8F7] border-y border-[#E2E8E5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">Society leadership</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">President</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start">
              <div>
                <img src="/assets/president.jpg" alt="Vezokho Chotso, President of Uzho Cultural Society" width="934" height="1269" loading="lazy" className="w-full max-w-[220px] h-auto rounded-xl border border-[#E2E8E5]" />
                <h3 className="mt-4 text-xl font-bold text-[#17251F]">Vezokho Chotso</h3>
                <p className="mt-1 text-sm text-[#176B52]">President, Uzho Cultural Society</p>
              </div>
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="text-xl font-bold text-[#17251F]">About the President</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#57655E]">Vezokho Chotso is the President of Uzho Cultural Society.</p>
                  <p className="mt-2 text-base leading-relaxed text-[#57655E]">His biography will be shared here once confirmed.</p>
                </div>
                <div className="border-t border-[#E2E8E5] pt-6">
                  <h3 className="text-xl font-bold text-[#17251F]">Message from the President</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#57655E]">A personal message from Vezokho Chotso will be published here soon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
