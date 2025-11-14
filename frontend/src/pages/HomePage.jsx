import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
  SparklesIcon,
  RocketIcon,
  TrophyIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <div className='min-h-screen'>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <motion.div
        className='relative overflow-hidden bg-gradient-to-b from-base-100 to-base-200'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        {/* Background Decorative Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse' />
          <div
            className='absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse'
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className='relative flex flex-col items-center justify-center text-center py-24 px-6 max-w-6xl mx-auto'>
          {/* Badge */}
          <motion.div
            className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <SparklesIcon className='size-4 text-primary' />
            <span className='text-sm font-semibold text-primary'>
              Next-Gen Interview Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className='text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 max-w-4xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}>
            Master Technical Interviews with{" "}
            <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
              InterviewFlow
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className='text-xl md:text-2xl max-w-3xl mx-auto text-base-content/70 mb-10 leading-relaxed'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}>
            Practice coding problems, conduct live interviews, and collaborate
            in real-time. Everything you need for technical interview success in
            one powerful platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className='flex flex-col sm:flex-row justify-center gap-4 mb-12'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}>
            <SignInButton mode='modal'>
              <button className='btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-2xl transition-all'>
                <RocketIcon className='size-5' />
                Start Practicing Free
                <ArrowRightIcon className='size-5' />
              </button>
            </SignInButton>

            <button className='btn btn-ghost btn-lg gap-2 border border-base-300 hover:border-primary/50'>
              <VideoIcon className='size-5' />
              See How It Works
            </button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            className='flex flex-wrap justify-center gap-3 max-w-3xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}>
            <div className='px-4 py-2 bg-base-100 border border-base-300 rounded-full flex items-center gap-2 shadow-sm'>
              <CheckIcon className='size-4 text-success' />
              <span className='text-sm font-medium'>30+ Coding Problems</span>
            </div>
            <div className='px-4 py-2 bg-base-100 border border-base-300 rounded-full flex items-center gap-2 shadow-sm'>
              <CheckIcon className='size-4 text-success' />
              <span className='text-sm font-medium'>
                12 Programming Languages
              </span>
            </div>
            <div className='px-4 py-2 bg-base-100 border border-base-300 rounded-full flex items-center gap-2 shadow-sm'>
              <CheckIcon className='size-4 text-success' />
              <span className='text-sm font-medium'>Live Video Sessions</span>
            </div>
            <div className='px-4 py-2 bg-base-100 border border-base-300 rounded-full flex items-center gap-2 shadow-sm'>
              <CheckIcon className='size-4 text-success' />
              <span className='text-sm font-medium'>
                Real-Time Collaboration
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* STATS SECTION */}
      <section className='py-16 bg-base-100'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid md:grid-cols-3 gap-8 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <div className='text-5xl font-black text-primary mb-2'>30+</div>
              <div className='text-lg text-base-content/70'>
                Curated Problems
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}>
              <div className='text-5xl font-black text-secondary mb-2'>12</div>
              <div className='text-lg text-base-content/70'>
                Languages Supported
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <div className='text-5xl font-black text-accent mb-2'>100%</div>
              <div className='text-lg text-base-content/70'>Free to Use</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className='max-w-7xl mx-auto px-6 py-20'>
        <div className='text-center mb-16'>
          <motion.div
            className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <TrophyIcon className='size-4 text-primary' />
            <span className='text-sm font-semibold text-primary'>
              Platform Features
            </span>
          </motion.div>

          <motion.h2
            className='text-4xl md:text-5xl font-black mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            Everything You Need to{" "}
            <span className='text-primary'>Ace Interviews</span>
          </motion.h2>

          <motion.p
            className='text-lg text-base-content/70 max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            From coding practice to live interview simulations, we've built the
            complete toolkit for technical interview preparation and execution.
          </motion.p>
        </div>

        {/* FEATURE CARDS */}
        <div className='grid md:grid-cols-3 gap-8'>
          {[
            {
              title: "Live Coding Environment",
              icon: <Code2Icon className='size-8 text-primary' />,
              text: "Write, run, and debug code in 12+ languages with our Monaco-powered editor. Real-time execution with instant feedback.",
              features: [
                "Syntax Highlighting",
                "Auto-completion",
                "Multi-language Support",
              ],
            },
            {
              title: "Video Interview Rooms",
              icon: <VideoIcon className='size-8 text-secondary' />,
              text: "Crystal-clear HD video calls with screen sharing. Create or join sessions instantly for seamless interview experiences.",
              features: ["HD Video Quality", "Screen Sharing", "Built-in Chat"],
            },
            {
              title: "Real-Time Collaboration",
              icon: <UsersIcon className='size-8 text-accent' />,
              text: "Work together on the same codebase simultaneously. See changes as they happen with live cursor tracking and editing.",
              features: [
                "Live Code Sync",
                "Instant Messaging",
                "Session Recording",
              ],
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className='card bg-base-100 border border-base-300 hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 group'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}>
              <div className='card-body'>
                <div className='size-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                  {feature.icon}
                </div>

                <h3 className='card-title text-2xl mb-2'>{feature.title}</h3>
                <p className='text-base-content/70 mb-4'>{feature.text}</p>

                <div className='space-y-2'>
                  {feature.features.map((item, i) => (
                    <div key={i} className='flex items-center gap-2 text-sm'>
                      <CheckIcon className='size-4 text-success flex-shrink-0' />
                      <span className='text-base-content/80'>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className='py-20 bg-base-200'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <motion.h2
              className='text-4xl md:text-5xl font-black mb-4'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}>
              Get Started in{" "}
              <span className='text-primary'>3 Simple Steps</span>
            </motion.h2>
            <motion.p
              className='text-lg text-base-content/70 max-w-2xl mx-auto'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              No complex setup. Just sign in and start practicing or
              interviewing.
            </motion.p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                step: "1",
                title: "Sign Up Free",
                description:
                  "Create your account in seconds. No credit card required, no hidden fees.",
              },
              {
                step: "2",
                title: "Choose Your Path",
                description:
                  "Practice problems solo or create/join live interview sessions with peers.",
              },
              {
                step: "3",
                title: "Start Coding",
                description:
                  "Write code, run tests, and collaborate in real-time with our powerful platform.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className='relative'
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}>
                <div className='card bg-base-100 border border-base-300 shadow-lg h-full'>
                  <div className='card-body'>
                    <div className='size-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 text-white text-2xl font-black shadow-lg'>
                      {item.step}
                    </div>
                    <h3 className='text-xl font-bold mb-2'>{item.title}</h3>
                    <p className='text-base-content/70'>{item.description}</p>
                  </div>
                </div>

                {index < 2 && (
                  <div className='hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2'>
                    <ArrowRightIcon className='size-8 text-primary/30' />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className='py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10'>
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <h2 className='text-4xl md:text-5xl font-black mb-6'>
              Ready to Level Up Your Interview Skills?
            </h2>
            <p className='text-xl text-base-content/70 mb-8 max-w-2xl mx-auto'>
              Join developers who are mastering technical interviews with
              InterviewFlow. Start practicing today — completely free!
            </p>

            <SignInButton mode='modal'>
              <button className='btn btn-primary btn-lg gap-2 shadow-2xl hover:shadow-primary/50 transition-all'>
                <RocketIcon className='size-6' />
                Create Free Account
                <ArrowRightIcon className='size-6' />
              </button>
            </SignInButton>

            <p className='text-sm text-base-content/50 mt-4'>
              No credit card required • Free forever • 12 languages supported
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className='py-12 bg-base-100 border-t border-base-300'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <div className='size-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center'>
              <SparklesIcon className='size-5 text-white' />
            </div>
            <span className='text-xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
              InterviewFlow
            </span>
          </div>
          <p className='text-base-content/60 text-sm'>
            © 2025 InterviewFlow. Empowering developers to ace technical
            interviews.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
