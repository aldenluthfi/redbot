import { Users, Heart, Globe, Award } from 'lucide-react';

export function Impact() {
  return (
    <section id="impact" className="py-24 bg-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-100 text-sm font-medium uppercase tracking-wider">Our Impact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Making a Difference
          </h2>
          <p className="text-xl text-red-100/80 max-w-2xl mx-auto mt-4">
            Every number represents a life touched and a community transformed.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">2,500+</div>
            <div className="text-red-100/80">Women Empowered</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">15+</div>
            <div className="text-red-100/80">Communities Reached</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
            <div className="text-red-100/80">Health Programs</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
            <div className="text-red-100/80">Volunteers</div>
          </div>
        </div>
      </div>
    </section>
  );
}