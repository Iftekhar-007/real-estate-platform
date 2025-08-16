import { FaUsers, FaRocket, FaShieldAlt } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaUsers size={40} />,
      title: "Expert Team",
      text: "Our skilled professionals are dedicated to delivering quality service and innovative solutions.",
    },
    {
      icon: <FaRocket size={40} />,
      title: "Fast & Reliable",
      text: "We ensure quick turnarounds without compromising quality, keeping your needs a priority.",
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Trusted & Secure",
      text: "Your trust is our strength. We maintain strict standards to keep your data and projects safe.",
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto text-center lg:w-9/12">
        <h2 className="lg:text-4xl md:text-3xl text-xl text-center font-bold font-philo text-gray-800">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div
                className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gray-100 text-gray-800 
                              transition duration-300 hover:bg-[#B9375D] hover:text-white"
              >
                {item.icon}
              </div>
              <h3 className="mt-6 text-gray-800 font-[poppins] text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-3 font-[poppins] text-sm text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
