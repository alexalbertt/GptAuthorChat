import React, { useState } from 'react';

type AuthorSelectorProps = {
  onAuthorChange: (selectedAuthor: string) => void;
}

const AuthorSelector = (props: AuthorSelectorProps) => {
  const [selectedAuthor, setSelectedAuthor] = useState<string>();

  const authorInfo = new Map();
  authorInfo.set('DC Dennett', { imgSrc: '/dc-dennett.jpg', bookTitle: 'From Bacteria to Bach and Back', wikipediaPage: 'https://en.wikipedia.org/wiki/Daniel_Dennett' });
  authorInfo.set('Douglas R. Hofstadter', { imgSrc: '/douglas-hofstadter.jpeg', bookTitle: 'I Am a Strange Loop', wikipediaPage: 'https://en.wikipedia.org/wiki/Douglas_Hofstadter' });
  authorInfo.set('Brian Cantwell Smith', { imgSrc: '/cantwell-smith.png', bookTitle: 'The Promise of Artificial Intelligence: Reckoning and Judgment', wikipediaPage: 'https://en.wikipedia.org/wiki/Brian_Cantwell_Smith' });
  authorInfo.set('Roger Penrose', { imgSrc: '/penrose.webp', bookTitle: 'The Emperor\'s New Mind', wikipediaPage: 'https://en.wikipedia.org/wiki/Roger_Penrose' });
  authorInfo.set('Ruth Garrett Millikan', { imgSrc: '/millikan.jpeg', bookTitle: 'Beyond Concepts: Unicepts, Language, and Natural Information', wikipediaPage: 'https://en.wikipedia.org/wiki/Ruth_Garrett_Millikan' });

  const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthor(event.target.value);
    props.onAuthorChange(event.target.value);
  };

  return (
    <div className="author-container">
      <p className="chatting-with-text">You are now chatting with...</p>
      <div className="author-info-container">
        {selectedAuthor ?
          <img src={authorInfo.get(selectedAuthor).imgSrc} alt={selectedAuthor} className="author-img" /> : <img src="/default.jpeg" alt={"no author"} className="author-img" />
        }
        <div className="author-info-text-container">
          <label className="select-dropdown">
            <select onChange={handleAuthorChange}>
              <option value="">Select an author...</option>
              <option value="DC Dennett">DC Dennett</option>
              <option value="Douglas R. Hofstadter">Douglas R. Hofstadter</option>
              <option value="Brian Cantwell Smith">Brian Cantwell Smith</option>
              <option value="Roger Penrose">Roger Penrose</option>
              <option value="Ruth Garrett Millikan">Ruth Garrett Millikan</option>
            </select>
          </label>
          {selectedAuthor && (
          <div>
            <div className="author-book">
              Author of <em>{authorInfo.get(selectedAuthor).bookTitle}</em>.
            </div>
            <div className="author-wiki">
              <a href={authorInfo.get(selectedAuthor).wikipediaPage} target="_blank">Wikipedia</a>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AuthorSelector;