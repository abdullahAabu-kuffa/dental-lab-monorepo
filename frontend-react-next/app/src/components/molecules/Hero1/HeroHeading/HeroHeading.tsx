export default function HeroHeading() {
  return (
    <h1
      className="text-3xl md:text-7xl font-black leading-tight text-center mb-8"
      style={{
        color: '#ffffff',
        fontFamily: "'DM Serif Display', serif"
      }}
    >
      {"Egypt's First "}
      <span style={{ color: '#E4B441' }}>Digital</span>
      {" Dental Lab"}
    </h1>
  );
}