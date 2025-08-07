import { Link } from 'react-router';
import alex from '../../assets/alex.webp';
import styles from './About.module.scss';
import ThemeButton from '../../components/ThemeButton';

const About = () => {
  const name = 'Alexei Shmulevtsov';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          About This Application <ThemeButton />
        </h1>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Author Information</h2>
          <p className={styles.text}>
            This application was created by {name} as part of the RS School
            React course.
          </p>
          <div className={styles.authorInfo}>
            <div className={styles.avatar}>
              <img src={alex} alt={name} />
            </div>
            <div>
              <h3 className={styles.authorName}>{name}</h3>
              <p className={styles.authorRole}>Frontend Developer</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>RS School React Course</h2>
          <p className={styles.text}>
            This project was developed as part of the RS School React course
            curriculum.
          </p>
          <a
            title="React course"
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Visit RS School React Course Website →
          </a>
        </div>

        <div className={styles.divider}>
          <Link title="Back to main" to="/" className={styles.link}>
            ← Back to Main Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
