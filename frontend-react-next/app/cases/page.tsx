import React from "react";

export default function CasesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
      
      {/* IMAGE SECTION */}
      <section 
        className="h-96 bg-cover bg-center bg-no-repeat relative mt-20"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920&h=800&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg mb-4">
              Dental Cases Collection
            </h1>
            <p className="text-white text-xl drop-shadow-md max-w-2xl mx-auto mb-6">
              Explore our comprehensive collection of dental cases and treatment examples
            </p>
            <div className="flex justify-center">
              <div className="bg-[#E4B441] text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
                View Our Work
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <main className="flex-1 pt-12">
        <div className="max-w-5xl mx-auto px-6 py-12">

          {/* SECTION: Restorative */}
          <h2 className="text-3xl font-extrabold text-[#0A2A5E] mb-4">
            Restorative Dentistry Cases
          </h2>

          <ul className="space-y-3 text-base text-gray-700 mb-12">
            <li>
              <strong>Cavity Restoration:</strong> Treating cavities using dental fillings, crowns, or inlays.
            </li>
            <li>
              <strong>Endodontic Treatment:</strong> Root canals where students practice removing infected tissue and sealing it.
            </li>
            <li>
              <strong>Composite Bonding:</strong> Repairing chipped or cracked teeth with tooth-colored resins.
            </li>
          </ul>

          {/* SECTION: Orthodontic */}
          <h2 className="text-3xl font-extrabold text-[#0A2A5E] mb-4">
            Orthodontic Cases
          </h2>

          <ul className="space-y-3 text-base text-gray-700 mb-12">
            <li>
              <strong>Braces and Aligners:</strong> Designing braces or aligners to correct misalignment issues.
            </li>
            <li>
              <strong>Retention Plans:</strong> Creating retainers for maintaining teeth alignment after braces.
            </li>
          </ul>

          {/* SECTION: Periodontics */}
          <h2 className="text-3xl font-extrabold text-[#0A2A5E] mb-4">
            Periodontics Cases
          </h2>

          <ul className="space-y-3 text-base text-gray-700 mb-12">
            <li>
              <strong>Gum Disease Treatment:</strong> Scaling and root planning procedures to treat gum disease.
            </li>
            <li>
              <strong>Soft Tissue Grafting:</strong> Reconstructing gums to treat gum recession.
            </li>
          </ul>

        </div>
      </main>
    </div>
  );
}
