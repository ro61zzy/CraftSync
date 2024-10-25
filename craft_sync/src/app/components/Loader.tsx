// src/app/components/Loader.tsx
const Loader = () => {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
        <style jsx>{`
          .loader {
            border: 8px solid #f3f3f3; /* Light gray */
            border-top: 8px solid #7B1179; /* Blue */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };
  
  export default Loader;
  