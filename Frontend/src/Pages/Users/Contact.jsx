import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Instagram, Twitter, Facebook } from 'lucide-react';
import Navbar from '../../components/Users/Navbar';
import Footer from '../../components/Users/Footer';
import { API_BASE_API } from '../../config/api';
import { useToast } from '../../contexts/ToastContext';
const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
        <Navbar/>
      {/* Hero Section */}
      <div className="relative pt-30 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">Get in Touch</h1>
          <p className="text-xl text-black max-w-2xl mx-auto italic">
            We'd love to hear from you! Whether you have a question about our products, need styling advice, or want to collaborate, our team is ready to help.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">hello@stylon.com</p>
                    <p className="text-gray-600">support@stylon.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Monday-Friday, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Headquarters</h3>
                    <p className="text-gray-600">123 Fashion Avenue</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Customer Support Hours</h3>
                    <p className="text-gray-600">Monday-Friday: 9am-8pm EST</p>
                    <p className="text-gray-600">Saturday-Sunday: 10am-6pm EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
              <p className="text-gray-600 mb-6">
                Follow us on social media for styling tips, new arrivals, and exclusive offers.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-indigo-100 text-indigo-600 p-3 rounded-full hover:bg-indigo-200 transition-colors duration-300"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="bg-indigo-100 text-indigo-600 p-3 rounded-full hover:bg-indigo-200 transition-colors duration-300"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="bg-indigo-100 text-indigo-600 p-3 rounded-full hover:bg-indigo-200 transition-colors duration-300"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "How long does shipping take?",
                answer: "We typically process orders within 1-2 business days. Standard shipping takes 3-5 business days, while express shipping arrives in 1-2 business days."
              },
              {
                question: "What is your return policy?",
                answer: "We offer free returns within 30 days of purchase. Items must be unworn, unwashed, and with original tags attached."
              },
              {
                question: "Do you offer international shipping?",
                answer: "Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email. You can track your package directly on our website or the carrier's site."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;

function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation: message required and at least one contact method
    if (!form.message || (!form.email && !form.phone)) {
      showError('Please provide a message and at least an email or phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        showError(err.message || 'Failed to send message. Please try again later.');
        setLoading(false);
        return;
      }

      showSuccess('Message sent. We will get back to you soon.');
      setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      showError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input id="firstName" value={form.firstName} onChange={handleChange} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your first name" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input id="lastName" value={form.lastName} onChange={handleChange} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your last name" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input id="email" value={form.email} onChange={handleChange} type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="your.email@example.com" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
        <input id="phone" value={form.phone} onChange={handleChange} type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Phone number" />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <select id="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="">Select a subject</option>
          <option>Product Inquiry</option>
          <option>Order Support</option>
          <option>Returns &amp; Exchanges</option>
          <option>Styling Advice</option>
          <option>Collaboration</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea id="message" value={form.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your message here..." />
      </div>

      <div>
        <button type="submit" disabled={loading} className="w-full bg-gray-700 disabled:opacity-60 text-white font-medium py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-rose-700 transition-all duration-300 shadow-md hover:shadow-lg">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}