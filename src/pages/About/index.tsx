import { Link } from 'react-router';

import alex from '../../assets/alex.webp';

const About = () => {
  const name = 'Alexei Shmulevtsov';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          About This Application
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Author Information
          </h2>
          <p className="text-gray-600 mb-4">
            This application was created by {name} as part of the RS School
            React course.
          </p>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300 mr-4">
              <img src={alex} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{name}</h3>
              <p className="text-gray-600 text-sm">Frontend Developer</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            RS School React Course
          </h2>
          <p className="text-gray-600 mb-4">
            This project was developed as part of the RS School React course
            curriculum.
          </p>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Visit RS School React Course Website →
          </a>
        </div>

        <div className="border-t pt-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            ← Back to Main Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
