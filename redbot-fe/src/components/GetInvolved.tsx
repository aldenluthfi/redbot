import { Heart, Hand, Megaphone, Calendar } from 'lucide-react';

export function GetInvolved() {
  return (
    <section id="get-involved" className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-500 text-sm font-medium uppercase tracking-wider">Join Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Get Involved
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Together, we can create lasting change. There are many ways to support our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-red-600/30 transition-all">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Donate</h3>
            <p className="text-gray-400 mb-6">
              Your contribution directly supports programs that empower women and protect children.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Donate Now
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-red-600/30 transition-all">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Hand className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Volunteer</h3>
            <p className="text-gray-400 mb-6">
              Share your skills and time to make a real difference in the lives of those we serve.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Join Us
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-red-600/30 transition-all">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Megaphone className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Advocate</h3>
            <p className="text-gray-400 mb-6">
              Help spread awareness about gender equality and reproductive health in your network.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Spread the Word
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-red-600/30 transition-all">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Partner</h3>
            <p className="text-gray-400 mb-6">
              Collaborate with us to create larger impact through corporate partnerships.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}