import styles from './EmptyList.module.scss';

export interface EmptyListProps {
  image: string;
  title: string;
  desscription: string;
}

export const EmptyList = ({image, title, desscription}: EmptyListProps) => {
  return (
    <div className={styles.empty_list}> 
      <img src={image} alt="Empty list image" />
      <h2>{title}</h2>
      <p>{desscription}</p>
    </div>
  );
}