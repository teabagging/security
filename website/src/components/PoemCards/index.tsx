import React from 'react';
import styles from './styles.module.css';

interface Poem {
  artist_name: string;
  lyrics: string;
}

const PoemCards: React.FC<{ poem: Poem }> = ({ poem }) => {
  // 使用空格分割 lyrics 字符串，获取单词数组
  const words = poem.lyrics.split(' ');

  // 取前三个单词（如果有的话），否则取整个 lyrics
  const firstThreeWords = words.slice(0, 3).join(' ');

  // 如果只有一个单词或没有单词，直接使用原始 lyrics 的第一个字符作为印章字符
  // 否则，可以使用第一个单词的第一个字符作为印章字符（这里根据你的需求来定）
  const sealCharacter = firstThreeWords ? firstThreeWords.charAt(0) : poem.lyrics.charAt(0);

  // 注意：这里我们不再需要单独的 seal, seals, seals3 等变量，因为我们只取前三个单词

  return (
    <div className={styles.card}>
      <div className={styles.seal}>{sealCharacter}</div>
      <h2>{firstThreeWords}</h2> {/* 显示前三个单词 */}
      <div className={styles.paragraphs}>
        <p>{poem.lyrics}</p> {/* 显示完整的 lyrics */}
      </div>
      <div className={styles.author}>— 🥳{poem.artist_name}</div>
    </div>
  );
};

export default PoemCards;




