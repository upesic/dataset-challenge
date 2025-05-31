const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="w-16 h-16 border-4 border-[#449ed8] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default Spinner;