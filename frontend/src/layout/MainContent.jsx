const MainContent = ({ children }) => {
  return (
    <main className="font-sans flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">{children}</div>
    </main>
  );
};

export default MainContent;
