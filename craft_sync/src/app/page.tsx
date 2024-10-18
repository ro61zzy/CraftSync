const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <header className="w-full py-6 bg-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-bold">MyApp</div>
          <div>
            <a href="/login" className="text-lg font-medium text-gray-700 hover:text-gray-900 mx-4">
              Login
            </a>
            <a href="/signup" className="text-lg font-medium text-gray-700 hover:text-gray-900">
              Sign Up
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Welcome to MyApp
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          The best platform to manage your projects and tasks efficiently.
        </p>
        <a
          href="/signup"
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Get Started
        </a>
      </main>

      <footer className="w-full py-4 bg-gray-800 text-white text-center">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
