// Articles.jsx
const articles = [
  {
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?_gl=1*tzjixs*_ga*NDcyODAwOTkxLjE3NDc4MzgzOTk.*_ga_8JE65Q40S6*czE3NTI2OTE3NDMkbzE1JGcxJHQxNzUyNjkxNzUzJGo1MCRsMCRoMA..",
    heading: "Renting & Buying: The Ultimate Guide",
    subtext:
      "The debate continues: Should you rent or buy? This comprehensive guide compares costs, benefits, and long-term outcomes.",
    cta: "Read More »",
  },
  {
    image:
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?_gl=1*a7m2pl*_ga*NDcyODAwOTkxLjE3NDc4MzgzOTk.*_ga_8JE65Q40S6*czE3NTI2OTE3NDMkbzE1JGcxJHQxNzUyNjkxNzg1JGoxOCRsMCRoMA..",
    heading: "Top 10 Property Buying Tips",
    subtext:
      "From budget planning to final paperwork, learn the smart steps to buying a property without regrets.",
    cta: "Explore Tips »",
  },
  {
    image:
      "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?_gl=1*2irh9*_ga*NDcyODAwOTkxLjE3NDc4MzgzOTk.*_ga_8JE65Q40S6*czE3NTI2OTE3NDMkbzE1JGcxJHQxNzUyNjkxODA5JGo1NiRsMCRoMA..",
    heading: "Work with Trusted Agents",
    subtext:
      "Our vetted agents ensure safe transactions and better deals. Find the right help in your property journey.",
    cta: "Find Agents »",
  },
];

const Articles = () => {
  return (
    <div className="py-10 px-4 lg:w-9/12 mx-auto md:px-10 bg-base-100">
      <h2 className="lg:text-4xl font-bold font-philo text-center mb-8">
        Latest Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="card bg-base-200 shadow-xl">
            <figure>
              <img
                src={article.image}
                alt={article.heading}
                className="w-full h-56 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-philo">{article.heading}</h2>
              <p className="text-sm text-gray-600 font-philo">
                {article.subtext}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm font-philo btn-primary">
                  {article.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
