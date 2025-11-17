export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-neon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              fill="currentColor"
              className="text-primary-foreground"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            />
          </svg>
        </div>
      </div>
      <span className="text-xl font-black gradient-text">GetRichify</span>
    </div>
  );
};
