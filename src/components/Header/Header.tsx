// ChatHeader.tsx

import styles from './Header.module.scss';

interface HeaderProps {
  imgSrc: string;
  name: string;
}

const Header = ({ imgSrc, name }: HeaderProps) => (
  <div className={styles.chat_header}>
    <img src={imgSrc} alt="User avatar" />
    <h2>{name}</h2>
  </div>
);

export default Header;