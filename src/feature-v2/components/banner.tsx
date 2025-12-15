export default function Banner({ text, className }: { text: string, className?: string }) {
  return (
    <div
      className={`relative z-10 top-4 left-[50%] translate-x-[-50%] w-fit h-9 bg-cover bg-center bg-no-repeat flex items-center justify-center px-8 py-2 ${className}`}
      style={{ backgroundImage: `url(/images/banner-bg.png)` }}
    >
      <span className="text-2xl text-[#26396C] uppercase">{text}</span>
    </div>
  );
}
