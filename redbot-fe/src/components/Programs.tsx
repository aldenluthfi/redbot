import { Heart, Users, Stethoscope, BookOpen, GraduationCap, Globe } from 'lucide-react';

const programs = [
  {
    icon: Heart,
    title: 'Gender Equality',
    description:
      'Advocating for equal rights and opportunities for all genders through education and community outreach programs.',
  },
  {
    icon: Stethoscope,
    title: 'Reproductive Health',
    description:
      'Providing accessible information and resources about reproductive health for women and adolescents.',
  },
  {
    icon: BookOpen,
    title: 'Women Empowerment',
    description:
      'Creating pathways for women to develop skills, confidence, and independence through workshops and mentorship.',
  },
  {
    icon: GraduationCap,
    title: 'Child Protection',
    description:
      'Ensuring children have access to education, safety, and the support they need to thrive.',
  },
  {
    icon: Users,
    title: 'Community Building',
    description:
      'Building supportive networks that foster understanding and solidarity among community members.',
  },
  {
    icon: Globe,
    title: 'Advocacy & Outreach',
    description:
      'Amplifying voices and raising awareness on issues affecting women and children across Indonesia.',
  },
];

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-500 text-sm font-medium uppercase tracking-wider">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Our Focus Areas
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Through our three core values — Respect, Educate, and Divert — we work to make a lasting impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-red-600/30 transition-all hover:bg-white/10"
            >
              <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600/20 transition-colors">
                <program.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {program.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}