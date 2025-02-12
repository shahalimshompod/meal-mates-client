import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-center">
      <motion.h1
        className="text-4xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About MealMates
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        MealMates is a platform dedicated to reducing food waste and feeding
        those in need. We connect food donors with individuals and communities
        who can benefit from surplus food, ensuring that no meal goes to waste.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            What We Do
          </h2>
          <p className="text-gray-600">
            We facilitate the donation and distribution of surplus food,
            ensuring it reaches those who need it the most.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Why We Do It
          </h2>
          <p className="text-gray-600">
            Food waste is a major issue, and many people go hungry every day.
            Our mission is to create a sustainable solution that benefits both
            donors and recipients.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Our Future Goals
          </h2>
          <p className="text-gray-600">
            We aim to expand our reach, integrate better logistics, and partner
            with more organizations to eliminate food waste at a larger scale.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
