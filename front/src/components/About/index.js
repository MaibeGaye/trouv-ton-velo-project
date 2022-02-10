import './style.scss';
import groupe from './dataAbout';

const About = () => (
  <div className="container about">
    <div className=" groupe">
      {groupe.map(({
        id,
        title,
        name,
      }) => (
        <div className="groupe-card" key={id}>
          <h1 className="groupe-name">{name}</h1>
          <div className="groupe-title">{title}</div>
          <p>Linkedin</p>
        </div>
      ))}

    </div>
  </div>
);

export default About;
