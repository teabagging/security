import React from 'react'; 
import styles from './styles.module.css'; 

interface WordContent {
  sentence: {
    sentences: Array<{
      sContent: string;
      sCn: string;
    }>;
    desc: string;
  };
  usphone: string;
  syno: {
    synos: Array<{
      pos: string;
      tran: string;
      hwds: Array<{ w: string }>;
    }>;
    desc: string;
  };
  ukphone: string;
  phrase: {
    phrases: Array<{
      pContent: string;
      pCn: string;
    }>;
    desc: string;
  };
  trans: Array<{
    tranCn: string;
    descOther: string;
    descCn: string;
    pos: string;
    tranOther: string;
  }>;
}

const PoemCard: React.FC<{ word: WordContent }> = ({ word }) => {
  return (
    <div className={styles.card}>
      <div className={styles.seal}>🍄</div>
      <h2>{word.syno.synos[0].tran}</h2>
      <div className={styles.paragraphs}>
        <h3>Example Sentences:</h3>
        {word.sentence.sentences.map((sentence, index) => (
          <p key={index}>{sentence.sContent} — <i>{sentence.sCn}</i></p>
        ))}
        
        <h3>Synonyms:</h3>
        <ul>
          {word.syno.synos.map((synonym, index) => (
            <li key={index}>
              {synonym.pos}: {synonym.tran} ({synonym.hwds.map(hw => hw.w).join(', ')})
            </li>
          ))}
        </ul>

        <h3>Example Phrases:</h3>
        <ul>
          {word.phrase.phrases.map((phrase, index) => (
            <li key={index}>{phrase.pContent} — <i>{phrase.pCn}</i></li>
          ))}
        </ul>

        <h3>Translations:</h3>
        {word.trans.map((translation, index) => (
          <p key={index}>
            <strong>{translation.pos}:</strong> {translation.tranCn} 
            <br />
            <i>{translation.descOther} ({translation.descCn})</i>
          </p>
        ))}
      </div>
      <div className={styles.author}>— 🥳{word.syno.synos[0].hwds[0].w}</div>
    </div>
  );
};

export default PoemCard;





