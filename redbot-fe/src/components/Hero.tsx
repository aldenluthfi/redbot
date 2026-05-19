import { Heart, Users, Shield, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-[#0f0f0f] to-[#0f0f0f]" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Mission badge */}
        <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-5 py-2 mb-8">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span className="text-red-400 text-sm font-medium">Social Initiative for Equality</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Empowering Women & Children
          <br />
          <span className="text-red-500">Through Equality</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          RED Project Indonesia is a social initiative focused on gender equality, reproductive health,
          and the empowerment of women and children. We operate with values of Respect, Educate, and Divert
          to ensure every child and woman regains control over their rights and future.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#programs"
            className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
          >
            Our Programs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#get-involved"
            className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
          >
            Get Involved
          </a>
        </div>

        {/* Core values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Respect</h3>
            <p className="text-gray-400">
              Treating every individual with dignity and honoring their experiences and choices.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Educate</h3>
            <p className="text-gray-400">
              Providing knowledge about reproductive health and gender equality to communities.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-7 h-7 text-red-500 fill-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Divert</h3>
            <p className="text-gray-400">
              Redirecting resources and opportunities to those who need them most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
