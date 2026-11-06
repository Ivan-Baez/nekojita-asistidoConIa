import Image from "next/image";

interface Product {
id: string;
name: string;
description: string;
image: string;
}

const PRODUCTS: Product[] = [
{
id: "remera-clasica",
name: "Remera Nekojita",
description: "Remera negra con logo de la banda.",
image: "/images/merch/remera.jpg",
},
];

export default function MerchSection() {
return ( <section className="flex flex-col gap-8" aria-label="Merch"> <header className="border-b-2 border-neutral-800 pb-6"> <div className="mb-3 flex items-center gap-3"> <span className="h-8 w-1.5 bg-[#ff003c]" /> <span className="text-xs font-black uppercase tracking-[0.3em] text-[#ff003c]">
Llevá a Nekojita con vos </span> </div>

    <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-7xl">
      Merch<span className="text-[#ff003c]">.</span>
    </h1>

    <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
      Remeras, discos y más. Apoyá a la banda y llevate un pedazo del punk
      rock mendocino.
    </p>

    <span className="mt-5 inline-block border border-[#ff003c] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#ff003c]">
      Tienda próximamente
    </span>
  </header>

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
    {PRODUCTS.map((product) => (
      <article
        key={product.id}
        className="group border-2 border-neutral-800 bg-neutral-950 transition-colors duration-200 hover:border-[#ff003c]"
      >
        <div className="relative aspect-square w-full overflow-hidden border-b-2 border-neutral-800 bg-neutral-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-3 p-5">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff003c]">
            Producto Nekojita
          </span>

          <h2 className="text-base font-black uppercase tracking-wider text-white sm:text-lg">
            {product.name}
          </h2>

          <p className="text-sm leading-relaxed text-neutral-400">
            {product.description}
          </p>

          <div className="mt-2 border-t border-neutral-800 pt-4">
            <span className="inline-block border border-neutral-700 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Próximamente
            </span>
          </div>
        </div>
      </article>
    ))}
  </div>
</section>


);
}
