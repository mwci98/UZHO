const officeBearers = [
  ['Vezokho Chotso', 'President', '9436077084'],
  ['Kerihol Stephen Theyo', 'Vice-President', '9366746299'],
  ['Keviyienuo Rose', 'Gen. Secretary', '9436077706'],
  ['Asenu Neikha', 'Asst. Gen. Secy', '9862346564'],
  ['Kühükro Chotso', 'Finance Secy', '8787858126'],
  ['Küvethita Chotso', 'Social & Cul. Secy', '8837317153'],
  ['Neoshila', 'Treasurer', '9612603445'],
  ['Küthonüyi Chotso', 'Member', '7005088688'],
  ['Venüyo Chotso', 'Member', '8730932858'],
  ['Peteneinuo Jessica', 'Member', '8787511083'],
  ['Neithonuo Neikha', 'Member', '7908993334'],
  ['Shuyieveto Chotso', 'Member', '9886279717'],
  ['Veniezo Cumu', 'Member', '8416085931'],
  ['Vesakho Chotso', 'Member', '9862746648'],
  ['Vepohü Chotso', 'Member', '8787687915'],
];

export function OfficeBearers() {
  return (
    <section className="py-12 sm:py-16 bg-white" aria-labelledby="office-bearers-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="office-bearers-heading" className="text-2xl sm:text-3xl font-bold text-[#17251F]">Name and Designation of Office Bearers</h2>
        <div className="mt-6 overflow-x-auto rounded-xl border border-[#E2E8E5] focus-visible:outline-2 focus-visible:outline-[#176B52]" role="region" aria-label="Office bearers table, scroll horizontally on small screens" tabIndex={0}>
          <table className="w-full min-w-[640px] text-left text-sm sm:text-base">
            <caption className="sr-only">Uzho Cultural Society office bearers, as listed in the supplied member document</caption>
            <thead className="bg-[#EAF4EF] text-[#17251F]">
              <tr>{['Sl. No.', 'Name', 'Designation', 'Phone No.'].map(label => <th key={label} scope="col" className="px-4 sm:px-6 py-4 font-semibold">{label}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8E5]">
              {officeBearers.map(([name, designation, phone], index) => (
                <tr key={phone} className="even:bg-[#F6F8F7]">
                  <td className="px-4 sm:px-6 py-4 text-[#57655E]">{index + 1}</td>
                  <th scope="row" className="px-4 sm:px-6 py-4 font-medium text-[#17251F]">{name}</th>
                  <td className="px-4 sm:px-6 py-4 text-[#57655E]">{designation}</td>
                  <td className="px-4 sm:px-6 py-4"><a href={`tel:+91${phone}`} className="text-[#176B52] whitespace-nowrap hover:underline">{phone}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
