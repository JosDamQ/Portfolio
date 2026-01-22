export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md dark:bg-gray-900/80 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Skills
              </a>
              <a
                href="#experience"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero" className="pt-20 pb-16 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Developer Portfolio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Full Stack Developer with 2+ years of experience creating modern
              web applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                View Projects
              </button>
              <button className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Download Resume
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-6 bg-white dark:bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              About Me
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Passionate developer with expertise in modern web technologies
                and a strong foundation in both frontend and backend
                development.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Frontend
                </h3>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Backend
                </h3>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Database
                </h3>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Tools
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="py-16 px-6 bg-white dark:bg-gray-800"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Experience
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  2+ years of professional development experience
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project 1
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Project description coming soon...
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project 2
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Project description coming soon...
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project 3
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Project description coming soon...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-6 bg-white dark:bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Contact
            </h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Developer Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
