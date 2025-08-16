export default function OurPartners() {
  const partners = [
    "/partenr1.webp",
    "/partner6.webp",
    "/partner2.webp",
    "/partner4.webp",
    "/partner3.webp",

    "/partner5.webp",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="lg:w-9/12 mx-auto px-4 text-center">
        <h2 className="lg:text-4xl md:text-3xl text-xl text-center font-bold font-philo text-gray-800">
          Our Partners
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-center pt-8">
          {partners.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition duration-300"
            >
              <img
                src={logo}
                alt={`Partner ${idx + 1}`}
                className="object-contain h-[150px] w-[150px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
