export function CommentModal({ isOpen, Close }) {
  return (
    isOpen && (
      <div className="fixed top-0 right-0 z-100 w-full h-screen bg-[#FFA1B3]/30 flex justify-center items-center">
        <div className="w-[400px] h-[400px] bg-white">
          <button onClick={Close}>Close</button>
        </div>
      </div>
    )
  );
}
