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
  {
    id: "disco-el-pacto",
    name: "Disco \"El pacto\"",
    description: "Primer sencillo en formato físico.",
    image: "/images/portadas/portada1.png",
  },
];

export default function MerchSection() {
  return (
    <section className="flex flex-col gap-8" aria-label="Merch">
      <header>
        <h1 className="text-4xl font-black uppercase tracking-wider text-white md:text-6xl">
          Merch
        </h1>
        <p className="mt-3 max-w-xl text-base text-neutral-400">
          Remeras, discos y más. La tienda abre pronto.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {PRODUCTS.map((product) => (
          <article
            key={product.id}
            className="border-2 border-neutral-800 bg-neutral-900 shadow-[4px_4px_0px_0px_rgba(255,0,60,1)]"
          >
            <div className="relative aspect-square w-full overflow-hidden border-b-2 border-neutral-800">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 p-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-white">
                {product.name}
              </h2>
              <p className="text-xs text-neutral-400">{product.description}</p>
              <span className="w-fit border-2 border-[#ff003c] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#ff003c]">
                Próximamente
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
