export default function Loader() {
  return (
    <div className="loader">
      <div className="logo">
        <img
          src="/logo.png"
          alt="Logo"
          className="logo-img"
          height="0"
          width="0"
        />
      </div>
      <style jsx>{`
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          z-index: 9999;
        }
        .logo {
          animation: bounce 2s infinite;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .logo-img {
          width: 120px;
          height: auto;
          transform: scale(0.5); /* Start small */
          animation: bounce 2s infinite, scaleUp 2s ease forwards;
          animation-delay: 0.5s; /* Delay the bounce until the scale-up is done */
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes scaleUp {
          0% {
            transform: scale(0.5); /* Start small */
          }
          100% {
            transform: scale(1); /* Scale to normal size */
          }
        }
      `}</style>
    </div>
  );
}
