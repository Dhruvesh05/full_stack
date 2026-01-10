// ClientsCarousel.jsx

import AnimateOnScroll from "./AnimateOnScroll";
import Image from "next/image";
export default function ClientsCarousel() {

 const clients = [
  { id: 1, name: "Abbott", logo: "abbot_logo.png" },
  { id: 2, name: "Aditya Birla Group", logo: "aditya_birla.png" },
  { id: 3, name: "Atvantic Finechem", logo: "atvantic.png" },
  { id: 4, name: "Birla Cellulose", logo: "birla_cellulose.png" },
  { id: 5, name: "Godrej", logo: "godrej.png" },
  { id: 6, name: "Reliance", logo: "reliance.png" },
  { id: 7, name: "Daramic", logo: "Daramic.jpg" },
  { id: 8, name: "DCM shriram", logo: "dcm_shriram.png" },
{ id: 9, name: "Detox India", logo: "detox_india.png" },
{ id: 10, name: "Elantas", logo: "elantas.png" },
{ id: 11, name: "GoldFinch", logo: "goldfinch.png" },
{ id: 12, name: "Hikal", logo: "hikal.png" },
{ id: 13, name: "indofil", logo: "indofil.png" },
{ id: 14, name: "MG", logo: "mg.png" },
{ id: 15, name: "Pidilite", logo: "pidilite.png" },
{ id: 16, name: "GFL", logo: "gfl.png" },
{ id: 17, name: "VaTechWabag", logo: "vatechwabag.png" },
{ id: 18, name: "Nerolac", logo: "nerolac.png" },
];
  return (
    <section className="bg-gray-100 py-20 overflow-hidden" aria-labelledby="clients-heading">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <AnimateOnScroll direction="up" delay={0.3}>
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl mb-6 text-center font-semibold text-gray-900" id="clients-heading">
            Our Esteemed Clients
          </h2>
          <p className="mt-3 text-gray-500 text-center text-lg">
            Trusted by industry leaders across multiple sectors
          </p>
        </div>
        </AnimateOnScroll>
          {/* Moving track */}
          <div className="flex w-max animate-clients-marquee gap-4" role="list">
            {[...clients, ...clients].map((client, index) => (
             <div aria-hidden={index >= clients.length} className="relative w-56 h-32 transition-all duration-400
      hover:scale-105 bg-white shadow-xl hover:shadow-2xl rounded-xl border-[1] border-gray-200 flex items-center justify-center" key={index}>
  <Image
  src={`/clients/${client.logo}`}
  alt={`${client.name} – client of Shubh Construction`}
  fill
  loading="lazy"
  sizes="(max-width: 768px) 200px, 250px"
  className="object-contain p-4"
/>
</div>
            ))}
        </div>
      </div>
    </section>
  );
}