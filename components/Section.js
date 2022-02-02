import Card from "./Card";

const Section = ({ genre, videos }) => {
  return (
    <div className="section">
      <h3>{genre}</h3>
      <div>
        {videos?.map(v => (
          <a key={v.id} href={`/video/${v.slug}`}>
            <Card thumbnail={v.thumbnail} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Section;
