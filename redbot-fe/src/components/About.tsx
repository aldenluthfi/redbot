import { Heart, Target, Eye } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#0f0f0f] to-red-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-red-500 text-sm font-medium uppercase tracking-wider">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Our Story & Mission
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                RED Project Indonesia was born from a deep commitment to creating a more equitable society.
                We believe that every woman and child deserves the right to make decisions about their own
                body, health, and future.
              </p>
              <p>
                Operating with our core values — <span className="text-red-500 font-medium">Respect</span>,{' '}
                <span className="text-red-500 font-medium">Educate</span>, and{' '}
                <span className="text-red-500 font-medium">Divert</span> — we work tirelessly to address
                the systemic barriers that prevent marginalized communities from accessing essential resources
                and opportunities.
              </p>
              <p>
                Through community-driven initiatives, educational programs, and strategic partnerships, we
                strive to build a Indonesia where gender equality is not just an aspiration, but a reality.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
                  <p className="text-gray-400">
                    To empower women and children by promoting gender equality, ensuring access to
                    reproductive health education, and creating pathways for sustainable empowerment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Vision</h3>
                  <p className="text-gray-400">
                    A society where every woman and child has full control over their rights, health,
                    and future — free from discrimination and violence.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Commitment</h3>
                  <p className="text-gray-300">
                    We are committed to creating safe spaces, amplifying voices, and driving meaningful
                    change for the communities we serve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
