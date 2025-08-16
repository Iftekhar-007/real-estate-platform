import CountUp from "react-countup";

export default function CounterSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <h2 className="text-4xl font-bold text-[#B9375D]">
            <CountUp end={1200} duration={3} />+
          </h2>
          <p className="mt-2 text-gray-600">Happy Clients</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-[#B9375D]">
            <CountUp end={350} duration={3} />+
          </h2>
          <p className="mt-2 text-gray-600">Projects Completed</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-[#B9375D]">
            <CountUp end={25} duration={3} />
          </h2>
          <p className="mt-2 text-gray-600">Team Members</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-[#B9375D]">
            <CountUp end={15} duration={3} /> yrs
          </h2>
          <p className="mt-2 text-gray-600">Experience</p>
        </div>
      </div>
    </section>
  );
}
