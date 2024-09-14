import { useState } from "react";
import { InputField } from "../components";
import { useContactUs } from "../features/user/userHookes";

const ContactUs = () => {
  const { mutate: contactUs } = useContactUs();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    contactUs(formData);

    setFormData({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 md:w-[50%] w-[90%]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name */}
          <div>
            <InputField
              label="Name"
              labelClass="block mb-1 text-sm font-semibold"
              inputName="name"
              inputClass="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required={true}
              onChange={handleChange}
            />
          </div>

          {/* User Email */}
          <div>
            <InputField
              label="Email"
              labelClass="block mb-1 text-sm font-semibold"
              inputName="email"
              inputType="email"
              inputClass="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={handleChange}
              required={true}
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Message</label>
            <textarea
              name="message"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
