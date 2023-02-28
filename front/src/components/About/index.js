import './style.scss';
import groupe from './dataAbout';

function About() {
  return (
    <div className="container about">
      <div className=" about-group">
        {groupe.map(({
          id,
          title,
          name,
          linkedin,
          github,
        }) => (
          <div className="about-group-card" key={id}>
            <h1 className="about-group-name">{name}</h1>
            <div className="about-group-title">{title}</div>
            <div className="about-group-medias">
              <div className="about-group-medias-linkedin"><a href={linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin" /></a></div>
              <div className="about-group-medias-github"><a href={github} target="_blank" rel="noreferrer"><i className="fab fa-github" /></a></div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default About;
